class AppError extends Error{}

class InvalidBody extends AppError{
  constructor(){
    super()
    this.message = `Invalid body, try again`
    this.errorCode = 400
  }
}
class InvalidCredentials extends AppError{
  constructor(){
    super()    
    this.message = `Invalid credentials`
    this.errorCode = 403
  }
}
class Unauthorized extends AppError{
  constructor(){
    super()    
    this.message = `Unauthorized`
    this.errorCode = 401
  }
}
class Forbidden extends AppError{
  constructor(){
    super()    
    this.message = `Forbidden`
    this.errorCode = 403
  }
}
class TokenExpired extends AppError{
  constructor(){
    super()    
    this.message = `Token expired, please log in again`
    this.errorCode = 401
  }
}
class MessageNotFound extends AppError{
  constructor(id){
    super()
    this.message = `Message with id ${id} not found`
    this.errorCode = 404
  }
}

class UserNotFound extends AppError{
    constructor(id){
      super()
      this.message = `User with id ${id} not found`
      this.errorCode = 401
    }
}

class TaskNotFound extends AppError{
  constructor(id){
    super()
    this.message = `Task with id ${id} not found `
    this.errorCode = 402
  }
}

module.exports = {
  AppError,
  InvalidBody,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
  MessageNotFound,
  Forbidden,
  UserNotFound,
  TaskNotFound
}