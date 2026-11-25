# QueueVeld — proposed AWS architecture

| Stage | Service | Role |
| --- | --- | --- |
| Import | Amazon S3 | Encrypted bucket per customer for appointment-history exports (CSV / EHR). |
| De-identify | AWS Lambda | Strips names, phone numbers and record numbers; validates rows; writes clean data. |
| Store | Amazon DynamoDB | Services, rooms, sessions, forecasts, recommendations and the decision log. |
| Forecast | Amazon SageMaker AI | Arrival and cancellation models per service, retrained weekly; error bands from back-testing. |
| Summarise | Amazon Bedrock | Plain-language weekly summaries that cite the figures used. No booking or clinical decisions. |

Each facility runs in its own AWS account and region. QueueVeld has read-only access to exports and no write access to scheduling systems.
