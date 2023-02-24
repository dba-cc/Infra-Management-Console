# Infra-Management Console
The Infra-Management Console is a management system for on-premise Microsoft SQL Server. The front-end is developed in AngularJS and the API is developed in C#.

This repository contains the following files and folders:

* **MSUIS View :** This folder contains the front-end of the project.
* **MSUISApi :** This folder contains the API required for the project.
* **DBAdmin.bak :** This file is a Microsoft SQL Server backup file that contains all of the stored procedures used to fetch data from the SQL Server.

### Identity & Access Management
The Infra-Management Console includes features for managing user accounts and logins for MSSQL, table permissions, database permissions, storage permissions, and generating permission reports.

|     User List     |     Add User     |
| :------------------: | :------------------: |
| ![user-mgmt-1](https://user-images.githubusercontent.com/79157299/221138720-d8b69886-62dd-40fa-a877-54d7e0c298ef.jpg) | ![user-mgmt-2](https://user-images.githubusercontent.com/79157299/221138806-a1b87a74-5389-4317-9d60-72a79d0f1e6f.jpg) |

|     Table Permission     |     Permission Report     |
| :------------------: | :------------------: |
| ![permission-mgmt-1](https://user-images.githubusercontent.com/79157299/221138852-5a307a28-b039-4ef1-826e-e57c1845e937.jpg) | ![permission-mgmt-2](https://user-images.githubusercontent.com/79157299/221138873-193c8420-ece6-4ff6-b161-00bc0358ea73.jpg) |

### Backup Management
The Infra-Management Console allows administrators to schedule backups on a weekly or daily basis, restore backup files, and manage backup retention policies.

|     Auto Backup     |     Restore Backup     |
| :------------------: | :------------------: |
| ![backup-mgmt-1](https://user-images.githubusercontent.com/79157299/221140342-d44b2b49-af79-44fc-8e23-8df826a88922.jpg) | ![backup-mgmt-2](https://user-images.githubusercontent.com/79157299/221140413-40353976-69bb-44b0-94c7-0b7837d4b8cf.jpg) |

### Analytics
The Infra-Management Console also includes analytics features, allowing administrators to review the analytics of the last executed queries with different types of filters. This feature can provide valuable insights into system performance and usage patterns.

|     Query Analytics     |     Login Analytics     |
| :------------------: | :------------------: |
| ![query-analytics-1](https://user-images.githubusercontent.com/79157299/221162929-bbf7d3bc-1ec9-40f5-a988-248758216fbd.jpg) | ![cred-analytics](https://user-images.githubusercontent.com/79157299/221140743-bc68f17c-ebf6-4175-9406-30eaca25a271.jpg) |

## Usage
To use the Infra-Management Console, you will need to restore the DBAdmin.bak file to your Microsoft SQL Server. Once the database is restored, you can then deploy the front-end and API to your server.
