pipeline {
    agent none
    environment {
        imageName = "${projectName}:${version}"
        appName = "${projectName}-${version}"
    }
    stages {
        stage("编译") {
            steps {
                echo "本地构建"
            }
        }
        stage("镜像构建和发布") {
            agent any
            steps {
                echo "开始构建镜像"
                echo "项目名称: ${projectName}, 版本号: ${version}, 域名: ${domain}"
                sh "pwd"
                dir("${env.WORKSPACE}") {
                    // 修改文件
                    sh "sed -i s/backendDomain/${backendDomain}/g k8s/docker/root.conf"
                }
                dir("${env.WORKSPACE}/${srcPath}/dist") {
                    sh "tar -zcf ../ROOT.tar.gz ."
                }
                dir("${env.WORKSPACE}/${srcPath}") {
                    sh "mv ROOT.tar.gz ${env.WORKSPACE}/k8s/docker/ROOT.tar.gz"
                }
                dir("${env.WORKSPACE}/k8s/docker") {
                    sh "docker rmi ${imageName} || true"
                    sh "docker build -t ${imageName} ."
                }
                echo "镜像构建完成"
                echo "开始部署容器"
                dir("${env.WORKSPACE}/k8s/docker") {
                    sh "docker stop container ${appName}"
                    sh "docker rm container ${appName}"
                    sh "docker run -d --name ${appName} -p 3000:8080 ${env.imageName}"
                }
                echo "部署容器完成"
            }
        }
    }
    post {
        failure {
            emailext attachLog: true,
            recipientProviders: [[$class: "CulpritsRecipientProvider"], [$class: "FailingTestSuspectsRecipientProvider"]],
            subject: "Failed Pipeline: ${currentBuild.fullDisplayName},ChangeID:${env.CHANGE_ID}",
            body: "Something is wrong with ${env.BUILD_URL}"
        }
        success {
            emailext attachLog: true,
            recipientProviders: [[$class: "CulpritsRecipientProvider"], [$class: "DevelopersRecipientProvider"]],
            subject: "deploy success: ${currentBuild.fullDisplayName}, ChangeID:${env.BUILD_ID}",
            body: "Everything is OK with ${currentBuild.fullDisplayName}\n耗费时长:${currentBuild.durationString}\n点击右边的URL ${env.BUILD_URL} 或者查看附件阅读关于本次部署的信息"
        }
    }
}
