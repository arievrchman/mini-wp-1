# mini-wp

Zappress by Arief Rachman

>### API Endpoint User
| Route | Method | Desc |
|-------|--------|------|
| /oauth | **POST** | login via facebook |
| /register | **POST** | regsiter |
| /login | **POST** | login via email |
| /auth | **GET** | authenticate user |

>### API Endpoints for Article

| Route | Method | Desc |
|-------|--------|------|
| /articles/newest | **GET** | Get 5 Article newest **(readonly, allusers)** |
| /articles/user | **GET** | Get All articles created by user **(owner article)** |
| /articles/ | **POST** | Create a new article **(member only)** |
| /articles/:id | **PUT** | Edit article **(member only, owner article)** |
| /articles/:id | **DELETE** | Delete article **(member only, owner article)** |


>### API Endpoints for Tag
| Route | Method | Desc |
|-------|--------|------|
| /tags | **GET** | find all tags |
| /tags/:name | **GET** | find tags by name |