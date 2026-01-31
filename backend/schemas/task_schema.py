from pydantic import BaseModel


class TaskCreate(BaseModel):
    user_id: int
    task_name: str
    task_type: str   # daily or weekly


class TaskUpdate(BaseModel):
    is_completed: bool


class TaskResponse(BaseModel):
    id: int
    user_id: int
    task_name: str
    task_type: str
    is_completed: bool

    class Config:
        from_attributes = True
