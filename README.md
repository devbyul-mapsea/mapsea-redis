# [MAPSEA] Redis Reverse Proxy Server

## 개발자
 - 담당자 : 최민석(devbyul-mapsea)

## 개발 환경
 - Server : Node v16.17.0
 - FrameWork : express v4.18.2
 - DevLanguage : typescript
 - Swagger : v3.0.3
 - Swagger-Endpoint : /api-docs

## 서버 소개
 - Redis Reverse Proxy 서버입니다.

### 사용 용도

## 추가 작업 필요한 부분
    Docker
    CI/CD
    WhiteList
        서비스 별 접근 가능한 화이트리스트 로직을 구성해야합니다.
    dev,production 환경에서의 apiKey 회사계정으로 변경 필요

## 코드 실행 방법

### Mac / Linux
#### Local
    npm run local
#### Developer
    npm run dev
#### Production
    npm start
#### Build
    npm run build

### Windows
#### Local
    npm run win:local
#### Developer
    npm run win:dev
#### Production
    npm run win:prod
#### Build
    npm run build

## 코드 동작 순서
    Route -> Middleware -> Controller -> Service
---
    [ env 작성 방법 ]
    1. .env에 추가할 값을 입력 합니다.
    2. `core/type/express/index.d.ts` 에 작성한 env 값의 타입을 정의합니다.
    3. `core/config/dotenv.ts` 에 작성한 evn 값을 정의합니다.

    [ 코드 작성 방법 ]
    3. Route 측에 endPoint 및 유효성 검사(Validation)을 작성합니다.
    4. 필요에 따라 Middleware 를 작성 한 후 Route 측에 Middleware 를 추가합니다.
    5. Controller 은 Route 측에서 유효성 검사가 끈난 사용자의 입력데이터(Request)와 응답(Response)을 작성하는 부분입니다.
    6. Service 은 비즈니스 로직(Business Logic)을 작성하는 부분입니다. 
    7. Route 와 Controller & Service 가 작성이 되면 그 바탕으로 docs 폴더에 있는 Swagger 문서를 작성합니다.
    
    [ Error 핸들링 작성 방법 ]

    8. `core/error` 에 해당하는 에러 메세지를 추가합니다.
    9.  `core/enum/error` 에 에러 메세지의 키값을 enum 값으로 지정합니다.
    10. `core/resoinse/apiResponse` 에 작성된 클레스를 이용하여 에러가 발생 할 경우 에러 처리를 진행합니다.

    new ApiError(
        res,
        SERVER_ERROR_STATUS(SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR)
    ).sendError();


    [ 주의 사항 ]
    - 유효성 검사를 진행 할 경우 validatorErrorChecker 미들웨어를 반드시 유효성 검사 밑에 작성 해야 합니다.
    

## 파일 구조 (Tree)
### Root [ `/` ]    
    ├── dist ----------------------- 빌드 
    ├── docs ----------------------- 스웨거 yaml
    ├── env  ----------------------- 개발 환경변수 
    ├── logs ----------------------- 로그 
    ├── eslintrc.json -------------- eslint 설정
    ├── .gitignore ----------------- 깃 제외파일 설정
    ├── .prettierrc ---------------- prettire 설정
    ├── package-lock.json ---------- 패키지매니저
    ├── package.json --------------- 패키지매니저
    ├── README.md ------------------ README
    └── tsconfig.json -------------- typescript 설정

### Swagger Docs [ `/docs` ]
    ├── openApi
    │   └── data
    │       └── tob
    │           ├── status.yaml
    │           └── validate.yaml -- 
    ├── path.yaml
    ├── status
    │   ├── mysql
    │   │   └── health.yaml
    │   └── node
    │       ├── health.yaml
    │       └── monitor.yaml
    └── swagger.yaml --------------- 스웨거 설정 

### Env [ `/env` ]
    ├── .env.developer ------------- 개발서버에서 개발할때 사용하는 환경변수
    ├── .env.local ----------------- 로컬에서 개발할때 사용하는 환경변수
    └── .env.production ------------ 실배포서버에서 개발할때 사용하는 환경변수

### Logger [ `/logs` ]
    ├── error
    │   ├── .5f1151ced196762ae8720e2c85f1519895bd259e-audit.json
    │   ├── 2023-08-07.error.log
    │   ├── 2023-08-09.error.log
    │   └── 2023-08-10.error.log
    └── info
        ├── .2436d524048517d05bb330dfbac036842bb1c056-audit.json
        ├── 2023-08-07.log
        ├── 2023-08-09.log
        └── 2023-08-10.log

### Source Code [ `/src` ]
    ├── core
    │   ├── config
    │   │   ├── db
    │   │   │   └── mysql.ts
    │   │   ├── dotenv.ts
    │   │   ├── express.ts
    │   │   └── logger.ts
    │   ├── enum
    │   │   ├── error
    │   │   │   ├── auth.error.enum.ts
    │   │   │   ├── db.error.enum.ts
    │   │   │   ├── server.error.enum.ts
    │   │   │   └── validation.error.enum.ts
    │   │   └── index.ts
    │   ├── error
    │   │   ├── auth.error.ts
    │   │   ├── datagokr.error.ts
    │   │   ├── db.error.ts
    │   │   ├── index.ts
    │   │   ├── server.error.ts
    │   │   └── validation.error.ts
    │   ├── interface
    │   │   ├── IError.ts
    │   │   ├── IExpress.ts
    │   │   ├── index.ts
    │   │   └── tob
    │   │       ├── ITob.Api.Request.ts
    │   │       ├── ITob.Param.ts
    │   │       ├── ITob.Response.ts
    │   │       └── ITob.Result.ts
    │   ├── reponse
    │   │   ├── apiError.ts
    │   │   └── apiResponse.ts
    │   ├── types
    │   │   └── express
    │   │       └── index.d.ts
    │   └── utility
    │       ├── dbUtil.ts
    │       ├── path.ts
    │       └── regex.ts
    ├── domain
    │   ├── controller
    │   │   ├── openApi
    │   │   │   └── tobVerificationApiController.ts
    │   │   ├── status
    │   │   │   └── statusController.ts
    │   │   └── whitelist
    │   ├── middleware
    │   │   ├── authorize.ts
    │   │   └── validation.ts
    │   ├── route
    │   │   ├── openApi
    │   │   │   ├── index.ts
    │   │   │   └── tobVerificationApi.ts
    │   │   ├── status
    │   │   │   ├── index.ts
    │   │   │   ├── mysql.ts
    │   │   │   └── node.ts
    │   │   └── whitelist
    │   │       ├── index.ts
    │   │       ├── openApi.ts
    │   │       └── status.ts
    │   └── service
    │       ├── openApi
    │       │   └── tobVerificationApiService.ts
    │       ├── status
    │       │   └── mysqlStatusService.ts
    │       └── whitelist
    │           ├── index.ts
    │           ├── openApi.ts
    │           └── status.ts
    └── index.ts