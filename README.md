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
| ![user-mgmt-1](/imgs/user-mgmt-1.jpg) | ![user-mgmt-2](/imgs/user-mgmt-2.jpg) |

|     Table Permission     |     Permission Report     |
| :------------------: | :------------------: |
| ![permission-mgmt-1](/imgs/permission-mgmt-1.jpg) | ![permission-mgmt-2](/imgs/permission-mgmt-2.jpg) |

### Backup Management
The Infra-Management Console allows administrators to schedule backups on a weekly or daily basis, restore backup files, and manage backup retention policies.

|     Auto Backup     |     Restore Backup     |
| :------------------: | :------------------: |
| ![backup-mgmt-1](/imgs/backup-mgmt-1.jpg) | ![backup-mgmt-2](/imgs/backup-mgmt-2.jpg) |

### Analytics
The Infra-Management Console also includes analytics features, allowing administrators to review the analytics of the last executed queries with different types of filters. This feature can provide valuable insights into system performance and usage patterns.

|     Query Analytics     ||
| :------------------: | :------------------: |
| ![query-analytics-1](/imgs/query-analytics.jpg) | ![cred-analytics](/imgs/query-analytics-1.jpg) |
| ![query-analytics-1](/imgs/query-analytics-2.jpg) | ![cred-analytics](/imgs/query-analytics-3.jpg) |

|     Credential Analytics     ||
| :------------------: | :------------------: |
| ![backup-mgmt-1](/imgs/cred-analytics.jpg) | ![backup-mgmt-2](/imgs/cred-analytics-1.jpg) |

## Usage
To use the Infra-Management Console, you will need to restore the DBAdmin.bak file to your Microsoft SQL Server. Once the database is restored, Replace your server's connection string in 'MSUISApi/web.config' file's '< ConnectionStrings >'. Then you can then deploy the front-end and API to your server.
