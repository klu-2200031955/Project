pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/klu-2200031955/Project.git', branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat  'docker-compose pull'
                    bat  'docker-compose build'
                }
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    bat  'docker-compose down --volumes --remove-orphans'
                    bat  'docker-compose up -d'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    bat  'docker ps'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed.'
        }
        always {
            bat  'docker system prune -af'
        }
    }
}
