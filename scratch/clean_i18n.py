import re

with open('data/i18n.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace any app_badge "v2.0 Desktop" with "v2.1.0 Desktop"
code = re.sub(r'app_badge: "v2\.0 Desktop"', r'app_badge: "v2.1.0 Desktop"', code)

# Ensure app_title is Microsoft Reward Automation
code = re.sub(r'app_title: "Microsoft Reward Auto"', r'app_title: "Microsoft Reward Automation"', code)

with open('data/i18n.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated data/i18n.js version & title tags')
