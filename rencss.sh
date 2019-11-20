# Created to rename css to scss, since i fucked up when creating the project
find . -name '*.css' -exec sh -c 'mv "$0" "${0%.css}.scss"' {} \;
