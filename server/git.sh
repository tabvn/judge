rm schema.sql
mysqldump -u root ued > schema.sql
cp -r /Users/toan/go/src/ued/ /Users/toan/Projects/judge/server
cp -r /Users/toan/Projects/ued_web/src /Users/toan/Projects/judge/web/src
cp -r /Users/toan/Projects/ued_web/public /Users/toan/Projects/judge/web/public
cp -r /Users/toan/Projects/ued_web/package.json /Users/toan/Projects/judge/web/
cd /Users/toan/Projects/judge/
git add -A
git commit -m "Update"
git push