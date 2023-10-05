from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()


app.mount("/", StaticFiles(directory="static"), name="static")