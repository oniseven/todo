import { Request, Response, NextFunction } from 'express'
import { ResponseMetadata } from '../types'

const ResponseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.withData = function(response: any, status = true, message = 'success'){
    const metadata: ResponseMetadata = {
      metadata: {
        status,
        message
      },
      response
    }
    return this.json(metadata)
  }

  res.noData = function (status = true, message = "success") {
    const metadata: ResponseMetadata = {
      metadata: {
        status,
        message
      }
    }
    return this.json(metadata)
  }

  res.withErrorCode = function ({
    status = true,
    message = "success",
    errCode = null,
    response,
  }) {
    const metadata: ResponseMetadata = {
      metadata: {
        status,
        message,
        errCode,
      },
      response
    }
    return this.json(metadata)
  }

  next()
}

export default ResponseHandler
