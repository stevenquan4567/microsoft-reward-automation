import os
import glob
import re

lang_bar = "[🇻🇳 Tiếng Việt](README.md) | [🇬🇧 English](docs/README_EN.md) | [🇨🇳 简体中文](docs/README_ZH.md) | [🇰🇷 한국어](docs/README_KO.md) | [🇯🇵 日本語](docs/README_JA.md) | [🇪🇸 Español](docs/README_ES.md) | [🇫🇷 Français](docs/README_FR.md) | [🇩🇪 Deutsch](docs/README_DE.md) | [🇮🇹 Italiano](docs/README_IT.md) | [🇧🇷 Português](docs/README_PT.md) | [🇷🇺 Русский](docs/README_RU.md)"
lang_bar_sub = "[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md) | [🇮🇹 Italiano](README_IT.md) | [🇧🇷 Português](README_PT.md) | [🇷🇺 Русский](README_RU.md)"

readme_files = glob.glob('docs/README_*.md') + ['README.md']

for fpath in readme_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update version header
    content = re.sub(r'# ⚡ Microsoft Reward Automation \(`v[0-9\.]+`\)', r'# ⚡ Microsoft Reward Automation (`v2.1.0`)', content)
    
    # Update version badge
    content = re.sub(r'Version-v[0-9\.]+-blue', r'Version-v2.1.0-blue', content)

    # Update lang bar
    bar = lang_bar_sub if fpath.startswith('docs') else lang_bar
    content = re.sub(r'🌐 \*\*Languages[^\n]+\n[^\n]+', f'🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  \n{bar}', content)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'Updated {fpath} to v2.1.0')
