#`laboratory04`

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List all films__

URL: `/api/films`

HTTP Method: GET.

Description: Retrieve all the available films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id" : 1;
    "title" : "Pulp Fiction";
    "isFavorite" = 1;
    "rating" = 5;
    "watchDate" "2024-03-10": ;
    "userId" : 1;
  },
  ...
]
```


