## ORG
|Command|Method|Uri|
|--|--|--|
|[get_org_list](#get_org_list)|`GET`|`/orgs`|
|[create_org](#create_org)|`POST`|`/orgs`|
|[get_org](#get_org)|`GET`|`/org/:org_id`|
|[delete_org](#delete_org)|`DELETE`|`/org/:org_id`|
|[set_org_name](#set_org_name)|`PUT`|`/org/:org_id/name`|
|[set_org_title](#set_org_title)|`PUT`|`/org/:org_id/title`|
|[get_org_app_list](#get_org_app_list)|`GET`|`/org/:org_id/apps`|
|[create_org_app](#create_org_app)|`POST`|`/org/:org_id/apps`|
|[get_org_app](#get_org_app)|`GET`|`/org/:org_id/app/:app_id`|
|[delete_org_app](#delete_org_app)|`DELETE`|`/org/:org_id/app/:app_id`|
|[get_org_member_list](#get_org_member_list)|`GET`|`/org/:org_id/members`|
|[create_org_member](#create_org_member)|`POST`|`/org/:org_id/members`|
|[get_org_member](#get_org_member)|`GET`|`/org/:org_id/member/:member_id`|
|[delete_org_member](#delete_org_member)|`DELETE`|`/org/:org_id/member/:member_id`|
## ORG_APP
#### ORG_APP Model Scope
`//org/{org_id}`
|Command|Method|Uri|
|--|--|--|
|[get_app_list](#get_app_list)|`GET`|`/apps`|
|[create_app](#create_app)|`POST`|`/apps`|
|[get_app](#get_app)|`GET`|`/app/:app_id`|
|[delete_app](#delete_app)|`DELETE`|`/app/:app_id`|
|[set_app_name](#set_app_name)|`PUT`|`/app/:app_id/name`|
|[set_app_title](#set_app_title)|`PUT`|`/app/:app_id/title`|
|[get_app_env_list](#get_app_env_list)|`GET`|`/app/:app_id/envs`|
|[create_app_env](#create_app_env)|`POST`|`/app/:app_id/envs`|
|[get_app_env](#get_app_env)|`GET`|`/app/:app_id/env/:env_id`|
|[delete_app_env](#delete_app_env)|`DELETE`|`/app/:app_id/env/:env_id`|
## ORG_MEMBER
#### ORG_MEMBER Model Scope
`//org/{org_id}`
|Command|Method|Uri|
|--|--|--|
|[get_member_list](#get_member_list)|`GET`|`/members`|
|[create_member](#create_member)|`POST`|`/members`|
|[get_member](#get_member)|`GET`|`/member/:member_id`|
|[delete_member](#delete_member)|`DELETE`|`/member/:member_id`|
|[set_member_email_address](#set_member_email_address)|`PUT`|`/member/:member_id/email_address`|
|[set_member_display_name](#set_member_display_name)|`PUT`|`/member/:member_id/display_name`|
|[set_member_password](#set_member_password)|`PUT`|`/member/:member_id/password`|
## APP_ENV
#### APP_ENV Model Scope
`//org/{org_id}/app/{app_id}`
|Command|Method|Uri|
|--|--|--|
|[get_env_list](#get_env_list)|`GET`|`/envs`|
|[create_env](#create_env)|`POST`|`/envs`|
|[get_env](#get_env)|`GET`|`/env/:env_id`|
|[delete_env](#delete_env)|`DELETE`|`/env/:env_id`|
|[set_env_name](#set_env_name)|`PUT`|`/env/:env_id/name`|
|[set_env_title](#set_env_title)|`PUT`|`/env/:env_id/title`|
|[get_env_user_list](#get_env_user_list)|`GET`|`/env/:env_id/users`|
|[create_env_user](#create_env_user)|`POST`|`/env/:env_id/users`|
|[get_env_user](#get_env_user)|`GET`|`/env/:env_id/user/:user_id`|
|[delete_env_user](#delete_env_user)|`DELETE`|`/env/:env_id/user/:user_id`|
## ENV_USER
#### ENV_USER Model Scope
`//org/{org_id}/app/{app_id}/env/{env_id}`
|Command|Method|Uri|
|--|--|--|
|[get_user_list](#get_user_list)|`GET`|`/users`|
|[create_user](#create_user)|`POST`|`/users`|
|[get_user](#get_user)|`GET`|`/user/:user_id`|
|[delete_user](#delete_user)|`DELETE`|`/user/:user_id`|
|[set_user_email_address](#set_user_email_address)|`PUT`|`/user/:user_id/email_address`|
|[set_user_display_name](#set_user_display_name)|`PUT`|`/user/:user_id/display_name`|
|[set_user_password](#set_user_password)|`PUT`|`/user/:user_id/password`|
