# 🏃‍♂️ Run Library Backend

## Quick Start:
```cmd
cd library-backend
npm start
```

## Expected:
```
🚀 Server running on port 5000
✅ MongoDB Connected: cluster0.h3emsay.mongodb.net
```

## MongoDB Auth Fix (current issue):
**"bad auth" = wrong username/password**

**Try these URIs in .env:**

1. **With database name:**
```
MONGO_URI=mongodb+srv://saif:12345@cluster0.h3emsay.mongodb.net/librarydb
```

2. **Admin database:**
```
MONGO_URI=mongodb+srv://saif:12345@cluster0.h3emsay.mongodb.net/admin
```

3. **No database (default):**
```
MONGO_URI=mongodb+srv://saif:12345@cluster0.h3emsay.mongodb.net
```

## Port 5000 cleanup:
```
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

**Success indicators:**
- ✅ No mongoose warnings
- ✅ No mongodb driver warnings  
- ✅ "✅ MongoDB Connected"

