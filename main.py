from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello")
async def sayHi():
    return {"message": "Hello Welcome"}

@app.get("/bye")
async def sayBye():
    return {"message": "See you again"}
