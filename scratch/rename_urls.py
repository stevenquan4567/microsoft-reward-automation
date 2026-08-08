import glob
import re

files_to_update = [
  'background/service_worker.js',
  'popup/popup.html',
  'README.md',
  'TRANSLATIONS.md',
  'CONTRIBUTING.md',
  'scratch/test_auto_update.js'
] + glob.glob('docs/README_*.md')

for fpath in files_to_update:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace github repo names
    new_content = content.replace('msr_automation', 'microsoft-reward-automation')

    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated URLs in {fpath}')
