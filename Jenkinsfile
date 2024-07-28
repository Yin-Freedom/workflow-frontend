// Using a remote Docker server
env.DOCKER_HOST = 'tcp://139.159.142.19:2375'

pipeline {
    agent none
    stages {
        stage("compile") {
            agent {
                docker {
                    image "gplane/pnpm:9-node20"
                    // If it is important to keep the workspace synchronized with other stages, use reuseNode true.
                    reuseNode true
                }
            }
            steps {
                echo "start build"
                sh "node -v && pnpm -v"
                // 设置npm镜像地址
                // sh "pnpm config get registry"
                // sh "pnpm config set registry http://rdsource.tp-link.com.cn/npm-official/"
                sh "cd ${env.WORKSPACE}/${srcPath} && pnpm install --no-frozen-lockfile && pnpm build"
                echo "build success"
            }
        }
        stage("image build and post") {
            agent any
            steps {
                echo "project name: ${projectName}, ARAS: ${version}, BL: ${domain}"
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
            subject: "deploy success: ${currentBuild.fullDisplayName}, ChangeID:${env.BUILD_ID}",
            body: "Everything is OK with ${currentBuild.fullDisplayName}\n耗费时长:${fcurrentBuild.durationString}\n点击右边的URL ${env.BUILD_URL} 或者查看附件阅读关于本次部署的信息"
        }
    }
}
