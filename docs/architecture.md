# Proposed AWS architecture

| Stage | Service | Role |
|---|---|---|
| Import | S3 | Encrypted bucket per facility for appointment exports |
| De-identify | Lambda | Removes names and record numbers, validates rows |
| Forecast | SageMaker AI | Arrival and cancellation models, retrained weekly |
| Summarise | Bedrock | Weekly plain-language summary quoting its figures |
| Store | DynamoDB | Services, rooms, suggestions, decision log |

One AWS account per facility. Read-only access to exports; no write access to scheduling systems.
