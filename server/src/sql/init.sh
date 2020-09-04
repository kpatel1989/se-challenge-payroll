FULLPATH=$(realpath "$0")
BASEDIR=$(dirname "$FULLPATH")

PGPASSFILE=$BASEDIR/.pgpass;
export PGPASSFILE

host='localhost'
dbname='db_payroll'
username='postgres'

createdb -h $host -U $username  -e $dbname
psql -h $host -U $username -d $dbname --file="./create-payroll-table.sql"