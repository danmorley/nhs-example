from crontab import CronTab
 
my_cron = CronTab(user='root')
job = my_cron.new(command='python ./manage.py publisher')
job.minute.every(1)
 
my_cron.write()