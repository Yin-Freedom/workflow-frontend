"""
- 该脚本用于导出、导入 Jenkins 的 Pipeline 脚本
- 需要安装 pip install jenkinsapi==0.3.13
"""

import os
import re

from jenkinsapi.jenkins import Jenkins

config_suffix = '.xml'

def export_job(job_pattern='.*', work_dir='.'):
    """ 导出 Jenkins 的 Job ，保存为 work_dir 目录下 XML 格式的配置文件 """
    for job_name in jk.keys():
        if not re.findall(job_pattern, job_name):
            continue
        config = jk.get_job(job_name).get_config()
        config_file = os.path.normpath(os.path.join(work_dir, job_name + config_suffix))
        os.makedirs(os.path.dirname(config_file), exist_ok=True)
        with open(config_file, 'w', encoding='utf-8') as f:
            f.write(config)
            print('已导出Job：', job_name)

def import_job(job_pattern='.*', work_dir='.'):
    """ 读取 work_dir 目录下的 Job 配置文件，导入 Jenkins
    - 为了允许 Job 配置文件包含非 ASCII 码字符，需要修改 jenkinsapi 源代码 job.py 中 update_config() 的代码，将 data=config 改为 data=config.encode('utf-8') 。详见 https://github.com/pycontribs/jenkinsapi/pull/840
    """
    for line in os.walk(work_dir, onerror=print):
        sub_dir,dir_list,file_list = line
        for file in file_list:
            if file[-len(config_suffix):] != config_suffix:
                continue
            # Jenkins 上创建的 Job ，可以位于 Folder 文件夹之下。因此这里的 job_name 是指 Job 的全名，等于 job_folder 加上 job_short_name
            # 从 sub_dir 的前缀中去掉 work_dir ，剩下的路径就是 job_folder
            job_folder = os.path.normpath(sub_dir).removeprefix(os.path.normpath(work_dir)).replace('\\', '/').removeprefix('/')
            job_short_name = file.removesuffix(config_suffix)
            job_name = job_folder + '/' + job_short_name
            # 读取 job 的配置文件
            if not re.findall(job_pattern, job_name):
                continue
            config_file = os.path.join(sub_dir, file)
            with open(config_file, 'r', encoding='utf-8') as f:
                config = f.read()
            # 导入 job 配置
            if jk.has_job(job_name):
                jk.get_job(job_name).update_config(config)
            else:
                print('Jenkins不存在该Job，正在自动创建：', job_name)
                # 这里可以调用 jk.create_job(job_name, config.encode('utf-8')) 来创建 Job ，但是不支持创建在 folder 中的 Job ，因此调用更底层的 jk.requester
                jk.requester.post_xml_and_confirm_status(
                    '{}/job/{}/createItem'.format(jk.baseurl, job_folder),
                    data=config.encode('utf-8'),
                    params={'name': job_short_name}
                )
            print('已导入Job：', job_name)


# 执行导出、导入
jk = Jenkins(baseurl='http://localhost:9090', username='yinhuidong', password='19970802', timeout=10, use_crumb=True)
# export_job('test/.*', '/tmp')
export_job('.*', '/tmp')
# import_job('.*')