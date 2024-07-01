# 前端项目地址

https://github.com/Linghucong1999/ruyiweb-puls.git

# 相关的pm2操作

1、查看监控信息 ：` pm2 monit`

2、pm2.io：监控和诊断 Web 界面：`pm2 plus`

# 命令列表

# Fork 模式

pm2 start app.js --name my-api # 程序名

# Cluster 模式

pm2 start app.js -i 0        # 将根据可用的 CPU 使用 LB 启动最大进程
pm2 start app.js -i max      # 和上面一样，但是不推荐使用。
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # 显示所有进程状态
pm2 jlist              # 以原始JSON格式打印进程列表
pm2 prettylist         # 以美化的JSON格式打印进程列表

pm2 describe 0         # 显示指定进程的所有信息

pm2 monit              # 监控所有进程

# Logs

pm2 logs [--raw]       # 在流中显示所有进程日志
pm2 flush              # 清空所有日志文件
pm2 reloadLogs         # 重新加载所有日志

# Actions

pm2 stop all           # 停止所有进程
pm2 restart all        # 重启所有进程

pm2 reload all         # 将 0s 宕机机时间重新加载（对于 NETWORKED 应用程序）

pm2 stop 0             # 停止指定进程id
pm2 restart 0          # 重启指定进程id

pm2 delete 0           # 将进程从pm2列表中删除
pm2 delete all         # 将从pm2列表中删除所有进程


# :tv::tv: 如果这个项目帮助了你的话，也希望您能给我一份动力


<img src="/assets/微信支付.png"  width="200" alt="..." />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<img src="/assets/支付宝支付.jpg"  width="200" alt="..." />