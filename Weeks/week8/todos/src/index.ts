import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'


const app = new Hono()


//our database 
const todos = [
  {
    id: 1,
    description: "turn in homework",
    isComplete: false
  },
  {
    id: 2,
    description: "Study for test",
    isComplete: false
  }
  
]
app.use("/*" , serveStatic({
  root: "./static",
}))

app.get('/api/todos', (c) => {
  //database call to fetch todos
  console.log("fetching and returning todos")
  return c.json(todos)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
