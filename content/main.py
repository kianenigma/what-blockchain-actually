import os
import yaml

def add_frontmatter_to_md_files():
    required_frontmatter = {
        "dg-publish": True,
        "dg-hide": True
    }

    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                with open(file_path, 'r+') as f:
                    content = f.read()
                    if content.startswith("---"):
                        end_of_frontmatter = content.find("---", 3)
                        frontmatter_content = content[3:end_of_frontmatter].strip()
                        frontmatter = yaml.safe_load(frontmatter_content)
                        if not frontmatter:
                            frontmatter = {}
                    else:
                        end_of_frontmatter = -1
                        frontmatter = {}

                    updated = False
                    for key, value in required_frontmatter.items():
                        if key not in frontmatter:
                            frontmatter[key] = value
                            updated = True

                    if updated:
                        new_frontmatter = "---\n" + yaml.dump(frontmatter, default_flow_style=False).strip() + "\n---\n"
                        new_content = new_frontmatter + content[end_of_frontmatter + 3:] if end_of_frontmatter != -1 else new_frontmatter + content
                        f.seek(0)
                        f.write(new_content)
                        f.truncate()

if __name__ == "__main__":
    add_frontmatter_to_md_files()
