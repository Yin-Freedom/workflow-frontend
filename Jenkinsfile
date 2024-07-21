pipeline {
    agent none
    stages {
        stage("编译") {
            agent {
                docker {
                    image "gplane/pnpm:9-node20"
                    // Pipeline supports adding custom arguments that are passed to Docker, allowing users to specify custom Docker Volumes to mount, 
                    // which can be used for caching data on the agent between Pipeline runs.
                    // args "-v /root/dms/.m2:/root/.m2"
                    // If it is important to keep the workspace synchronized with other stages, use reuseNode true.
                    reuseNode true
                }
            }
            steps {
                echo "正在构建项目"
                sh "node -v && pnpm -v"
                // 设置npm镜像地址
                // sh "pnpm config get registry"
                // sh "pnpm config set registry http://rdsource.tp-link.com.cn/npm-official/"
                sh "cd ${env.WORKSPACE}/${srcPath} && pnpm install --no-frozen-lockfile && pnpm build"
                echo "构建项目成功"
            }
        }
        stage("镜像构建发布") {
            agent any
            steps {
                echo "项目名称: ${projectName}, ARAS: ${version}, BL: ${domain}"
                // sh "chmod at+x ${env.WORKSPACE}/${srcPath}/build_kubernetes.sh"
                // sh "${env.WORKSPACE}/${srcPath}/build_kubernetes.sh"
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
            subject: "部署成功: ${currentBuild.fullDisplayName}, ChangeID:${env.BUILD_ID}",
            body: "Everything is OK with ${currentBuild.fullDisplayName}\n耗费时长:${fcurrentBuild.durationString}\n点击右边的URL ${env.BUILD_URL} 或者查看附件阅读关于本次部署的信息"
        }
    }
}
