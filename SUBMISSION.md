# Submission Details

This file will detail the contents of the implementation of the Notification Management Service:

---

## **1. Files Included**

The following files are included in submission:

1. **Source Code**:
   - All files under the `src/` directory, including controllers, services, and models.
2. **Configuration Files**:
   - `Dockerfile`
   - `docker-compose.yml`
   - `package.json`
3. **Documentation**:
   - `README.md` (Exercise overview and setup instructions)
   - This `SUBMISSION.md` file (Submission details)

---

## **2. Project Structure**

Project directory should follows this structure:

```
/project-root
├── docker-compose.yml              # Docker Compose file
├── Dockerfile                      # Dockerfile for the service
├── package.json                    # Dependencies
├── src/                            # Source code
│   ├── controllers/                # Controllers
│   ├── services/                   # Services
│   ├── models/                     # Models
├── README.md                       # Project overview and setup instructions
├── SUBMISSION.md                   # Submission instructions
```

---

## **3. How to Run the Project**

### **Using Docker Compose**
1. Build and start the services:
   ```bash
   docker-compose up --build
   ```
2. Access the services:
   - **User Notifications Manager**: Accessible on port `8080`.
   - **Notification Service**: Accessible on port `5001`.

3. Stop the services:
   ```bash
   docker-compose down
   ```

---

## **4. Testing the Endpoints and Sample outputs**

### **Send Notification**
```bash
curl -X POST http://localhost:8080/users/send-notification \
-H "Authorization: Bearer onlyvim2024" \
-H "Content-Type: application/json" \
-d '{
  "userId": 1,
  "message": "Hello, this is a notification!"
}'
>>{"status":"sent","responses":[{"channel":"email","response":{"status":"sent","channel":"email","to":"ironman@avengers.com","message":"Hello, this is a notification!"}},{"channel":"sms","response":{"status":"sent","channel":"sms","to":"+123456789","message":"Hello, this is a notification!"}}]}%
```

### **Edit User Preferences**
```bash
curl -X PUT http://localhost:8080/users/edit-preferences \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{
  "email": "ironman@avengers.com",
  "preferences": { "email": false, "sms": true }
}'
>>{"message":"Preferences updated","user":{"userId":1,"email":"ironman@avengers.com","telephone":"+123456789","preferences":{"email":false,"sms":true}}}%
```

### **Create User Preferences**
```bash
curl -X POST http://localhost:8080/users/create-preferences \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{
  "email": "newuser@example.com",
  "telephone": "+123456789",
  "preferences": { "email": true, "sms": true }
}'
>>{"message":"User created","newUser":{"userId":5,"email":"newuser@example.com","telephone":"+123456789","preferences":{"email":true,"sms":true}}}%
```

---
