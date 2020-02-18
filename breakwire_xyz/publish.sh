#! /bin/zsh

git add .
git commit -m "update"
git push origin master

ssh breakwire_xyz "cd breakwire_xyz; git pull origin master; exit"

echo "Site updated at https://breakwire.xyz"

