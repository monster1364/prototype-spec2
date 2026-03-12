#!/usr/bin/env python3
"""
Proto PR → Slack 알림 스크립트
- PR diff를 Claude API로 요약
- 변경된 파일 경로 기준으로 서비스별 Slack 채널에 전송
"""
import os
import re
import json
import subprocess
import urllib.request


# ─── 서비스 채널 라우팅 설정 ───────────────────────────────────────
# 파일 경로에 아래 키워드가 포함되면 해당 채널로 전송
SERVICE_ROUTES = [
    {
        "name": "Common OMS",
        "keywords": ["common/oms", "order-dashboard", "common/pim"],
        "webhook_env": "SLACK_WEBHOOK_OMS",
    },
    {
        "name": "Nuflaat",
        "keywords": ["nuflaat"],
        "webhook_env": "SLACK_WEBHOOK_NUFLAAT",
    },
    {
        "name": "Gentle Monster",
        "keywords": ["gentle-monster", "/gm/", "gm-admin"],
        "webhook_env": "SLACK_WEBHOOK_GM",
    },
]
# ──────────────────────────────────────────────────────────────────


def git(*args):
    result = subprocess.run(["git"] + list(args), capture_output=True, text=True)
    return result.stdout.strip()


def call_claude(diff_text: str, pr_title: str, api_key: str) -> str | None:
    payload = {
        "model": "claude-haiku-4-5-20251001",
        "max_tokens": 600,
        "messages": [
            {
                "role": "user",
                "content": (
                    f"PR 제목: {pr_title}\n\n"
                    f"코드 diff (tsx/ts 파일):\n{diff_text[:4000]}\n\n"
                    "이 변경 내용을 비개발자(PM, 디자이너)가 이해할 수 있게 "
                    "한국어로 요약해줘. "
                    "변경된 화면과 기능 위주로 bullet point(• 기호 사용)로 작성해. "
                    "코드 용어는 쉬운 말로 풀어써. 3줄 이내."
                ),
            }
        ],
    }
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(payload).encode(),
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
            return data["content"][0]["text"]
    except Exception as e:
        print(f"[Claude API error] {e}")
        return None


def send_slack(webhook_url: str, blocks: list, fallback_text: str) -> bool:
    payload = {"text": fallback_text, "blocks": blocks}
    req = urllib.request.Request(
        webhook_url,
        data=json.dumps(payload).encode(),
        headers={"content-type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except Exception as e:
        print(f"[Slack error] {e}")
        return False


def build_blocks(
    service_name: str,
    pr_title: str,
    author: str,
    preview_url: str,
    pr_url: str,
    notion_url: str | None,
    summary: str | None,
) -> list:
    blocks = [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": f"🖥️ [프로토타입] {service_name} — {pr_title}",
                "emoji": True,
            },
        },
        {
            "type": "section",
            "fields": [
                {"type": "mrkdwn", "text": f"*👤 작성자*\n{author}"},
                {"type": "mrkdwn", "text": f"*🔗 프리뷰*\n<{preview_url}|열기>"},
            ],
        },
    ]

    if notion_url:
        blocks.append(
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"📋 *Notion 정책서* <{notion_url}|보기>",
                },
            }
        )

    if summary:
        blocks.append({"type": "divider"})
        blocks.append(
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*📝 변경 요약 (AI)*\n{summary}",
                },
            }
        )

    blocks.append(
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "PR 보기"},
                    "url": pr_url,
                },
                {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "프리뷰 열기"},
                    "url": preview_url,
                    "style": "primary",
                },
            ],
        }
    )

    return blocks


def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    preview_url = os.environ.get("PREVIEW_URL", "")
    pr_title = os.environ.get("PR_TITLE", "(제목 없음)")
    pr_url = os.environ.get("PR_URL", "")
    pr_body = os.environ.get("PR_BODY", "")
    author = os.environ.get("AUTHOR", "unknown")
    base_sha = os.environ.get("BASE_SHA", "")
    head_sha = os.environ.get("HEAD_SHA", "")
    default_webhook = os.environ.get("SLACK_WEBHOOK_DEFAULT", "")

    # ── 변경된 파일 목록 ─────────────────────────────────────────
    changed_files = [
        f
        for f in git("diff", "--name-only", base_sha, head_sha).split("\n")
        if f
    ]
    print(f"Changed files ({len(changed_files)}): {changed_files}")

    # ── diff 추출 (tsx/ts 파일만, 4000자 제한) ────────────────────
    diff = git("diff", base_sha, head_sha, "--", "*.tsx", "*.ts")

    # ── Notion URL 추출 ──────────────────────────────────────────
    notion_url = None

    # 1) PR body에서 검색
    m = re.search(r"https://www\.notion\.so/\S+", pr_body)
    if m:
        notion_url = m.group(0).rstrip(")")

    # 2) 변경된 tsx/ts 파일의 NOTION_PAGE 상수에서 검색
    if not notion_url:
        for f in changed_files:
            if not f.endswith((".tsx", ".ts")):
                continue
            try:
                with open(f) as fp:
                    content = fp.read()
                m = re.search(r'NOTION_PAGE\s*=\s*["\']([^"\']+)["\']', content)
                if m:
                    notion_url = m.group(1)
                    break
            except Exception:
                pass

    # ── 서비스 채널 라우팅 ────────────────────────────────────────
    targets: list[tuple[str, str]] = []  # [(service_name, webhook_url), ...]

    for route in SERVICE_ROUTES:
        webhook = os.environ.get(route["webhook_env"], "")
        if not webhook:
            continue
        for f in changed_files:
            if any(kw in f for kw in route["keywords"]):
                targets.append((route["name"], webhook))
                break

    # 매칭 없으면 default 채널
    if not targets:
        if default_webhook:
            targets.append(("Prototype", default_webhook))
        else:
            print("No Slack webhooks configured. Skipping.")
            return

    # 중복 제거
    seen = set()
    unique_targets = []
    for t in targets:
        if t[1] not in seen:
            seen.add(t[1])
            unique_targets.append(t)

    # ── Claude 요약 ───────────────────────────────────────────────
    summary = None
    if api_key and diff:
        print("Calling Claude API for summary...")
        summary = call_claude(diff, pr_title, api_key)
        if summary:
            print(f"Summary:\n{summary}")

    # ── Slack 전송 ────────────────────────────────────────────────
    for service_name, webhook_url in unique_targets:
        blocks = build_blocks(
            service_name=service_name,
            pr_title=pr_title,
            author=author,
            preview_url=preview_url,
            pr_url=pr_url,
            notion_url=notion_url,
            summary=summary,
        )
        fallback = f"[프로토타입] {service_name} — {pr_title} | {preview_url}"
        ok = send_slack(webhook_url, blocks, fallback)
        print(f"Slack #{service_name}: {'✅ sent' if ok else '❌ failed'}")


if __name__ == "__main__":
    main()
