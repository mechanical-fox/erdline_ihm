import { ServerInfo } from "../api/ServerInfo";


export const example : ServerInfo = {
    "name" : "API Supervision",
    "version" : "v1.4",
    "urlServer" : "http://127.0.0.1:8080",
    "endpoints" : [
        {
            "method" : "POST",
            "path" : "/pipeline/{project}/{type}/{environment}/start",
            "tag" : "Executions",
            "status_list" : [
                200,
                400,
                404,
                500
            ],
            "parameters" : [
                {
                    "type" : "Path",
                    "name" : "project",
                    "example" : "LoyaltyWS"
                },
                {
                    "type" : "Path",
                    "name" : "type",
                    "example" : "CYPRESS"
                },
                {
                    "type" : "Path",
                    "name" : "environment",
                    "example" : "PRE"
                }
            ],
            "examples" : [
                {
                    "name" : "Body",
                    "value" : "{\"id\": 1933885662,\"ref\": \"main\", \"status\": \"created\",\"created_at\": \"2025-07-18T08:45:42.053Z\",\"web_url\": \"https://gitlab.com/kiabi-com/group/retail/marketing-client/tests/api-automation-tests/-/pipelines/1933885662\"}"
                }
            ]
        },
        {
            "method" : "GET",
            "path" : "/pipeline",
            "tag" : "Executions",
            "status_list" : [
                200,
                500
            ],
            "parameters" : [],
            "examples" : [
                {
                    "name" : "Reponse",
                    "value" : "[{\"id\": 1,\"project\": \"LoyaltyWS\",\"type\": \"CYPRESS\",\"gitlab\": \"https://gitlab.com/kiabi-com/group/retail/marketing-client/tests/api-automation-tests/-/pipelines\",\"lastExecution\": \"2025-07-18 11:21\",\"environments\": [\"REC\",\"PRE\"]}]"
                }
            ]
        },
        {
            "method" : "GET",
            "path" : "/result/gatling",
            "tag" : "Resultats",
            "status_list" : [
                200,
                500
            ],
            "parameters" : [],
            "examples" : [
                {
                    "name" : "Reponse",
                    "value" : "[\n{\n\"project\": \"CustomerWS-v1\", \"groups\": [{\"environment\": \"REC\",\"results\": [{\"date\": \"2025-04-30 15:12:10.506588\",\"reportId\": 129,\"total\": 3097,\"nbRequestFailed\": 8,\"meanTime\": 208, \"percentile95\": 617,\"maxTime\": 30058}]}]}]"
                }
            ]
        },
        {
            "method" : "GET",
            "path" : "/result/functional",
            "tag" : "Resultats",
            "status_list" : [
                200,
                500
            ],
            "parameters" : [],
            "examples" : [
                {
                    "name" : "Reponse",
                    "value" : "[{\"project_id\": 2,\"project_name\": \"LoyaltyWS\",\"results\": [{\"environment\": \"PRE\",\"date\": \"2025-05-12 16:56:01.575319\",\"reportId\": 159,\"succeed\": 23,\"failed\": 0,\"broken\": 0}]}]"
                }
            ]
        },
        {
            "method" : "GET",
            "path" : "/report/{id}",
            "tag" : "Resultats",
            "status_list" : [
                200,
                404,
                500
            ],
            "parameters" : [
                {
                    "type" : "Path",
                    "name" : "id",
                    "example" : "106"
                }
            ],
            "examples" : [
                {
                    "name" : "Reponse",
                    "value" : "\"/public/report106/index.html\""
                }
            ]
        }
    ]
};