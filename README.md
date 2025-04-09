# Philosophy API

## Описание данных

### Философы (philosophers)
- id: number
- name: string
- school: string
- isActive: boolean
- birthDate: Date
- works: Array<string>
- createdAt: Date

### Книги (books)
- id: number
- title: string
- author: string
- isPublished: boolean
- publishDate: Date
- themes: Array<string>
- createdAt: Date

## Роутинг

### Philosophers
- GET /api/v1/philosophers - получить всех философов
- GET /api/v1/philosophers/:id - получить философа по ID
- POST /api/v1/philosophers - создать нового философа
- PUT /api/v1/philosophers/:id - обновить данные философа
- PATCH /api/v1/philosophers/:id - частичное обновление данных философа
- DELETE /api/v1/philosophers/:id - удалить философа

### Books
- GET /api/v1/books - получить все книги
- GET /api/v1/books/:id - получить книгу по ID
- POST /api/v1/books - создать новую книгу
- PUT /api/v1/books/:id - обновить данные книги
- PATCH /api/v1/books/:id - частичное обновление данных книги
- DELETE /api/v1/books/:id - удалить книгу
