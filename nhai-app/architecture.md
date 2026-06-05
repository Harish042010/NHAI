# 🏗️ Architecture — NHAI Offline Face Authentication System

## System Architecture Diagram

```mermaid
graph TB
    subgraph "📱 Mobile Device (Edge)"
        A[Camera Module] --> B[MediaPipe Face Mesh]
        B --> C[Face Detection & Alignment]
        C --> D[MiniFASNet v2]
        D --> E{Passive Liveness}
        E -->|Real| F[Active Liveness Challenge]
        E -->|Fake| G[❌ Spoofing Rejected]
        F --> H{Challenge Passed?}
        H -->|Yes| I[MobileFaceNet]
        H -->|No| J[❌ Retry Challenge]
        I --> K[Generate 128-dim Embedding]
        K --> L[Cosine Similarity Match]
        L --> M{Confidence ≥ 95%?}
        M -->|Yes| N[✅ Identity Verified]
        M -->|No| O[❌ Authentication Failed]
        N --> P[Attendance Engine]
        P --> Q[SQLCipher Database]
    end

    subgraph "☁️ Cloud Backend"
        Q -->|When Online| R[AWS S3 Sync]
        R --> S[AWS Lambda Processing]
        S --> T[Admin Dashboard API]
        T --> U[📊 Admin Dashboard]
    end

    subgraph "🔒 Security Layer"
        V[AES-256 Encryption] --> Q
        W[Device Binding] --> Q
        X[Hash Chain Verification] --> P
    end
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant Camera
    participant FaceDetect as MediaPipe
    participant Liveness as MiniFASNet
    participant Recognizer as MobileFaceNet
    participant DB as SQLCipher
    participant Cloud as AWS S3

    User->>Camera: Open App
    Camera->>FaceDetect: Video Frame
    FaceDetect->>FaceDetect: Detect Face + Landmarks
    FaceDetect->>Liveness: Aligned Face
    Liveness->>Liveness: Anti-Spoofing Check
    
    alt Real Face
        Liveness->>User: Active Challenge (Random)
        User->>Liveness: Complete Challenge
        Liveness->>Recognizer: Verified Face
        Recognizer->>Recognizer: Generate Embedding
        Recognizer->>DB: Compare with DB
        
        alt Match Found (≥95%)
            DB->>User: ✅ Authenticated
            DB->>DB: Log Attendance
        else No Match
            DB->>User: ❌ Unknown Person
        end
    else Fake Face
        Liveness->>User: ❌ Spoofing Detected
    end

    Note over DB,Cloud: When Network Available
    DB->>Cloud: Sync Attendance Logs
    Cloud->>DB: Confirm & Cleanup
```

## Module Architecture

```mermaid
graph LR
    subgraph "Face Detection"
        A1[MediaPipe Face Mesh]
        A2[468 Landmarks]
        A3[Face Bounding Box]
    end

    subgraph "Liveness Detection"
        B1[MiniFASNet - Passive]
        B2[Active Challenges]
        B3[Blink / Smile / Head Turn]
    end

    subgraph "Face Recognition"
        C1[MobileFaceNet]
        C2[128-dim Embedding]
        C3[Cosine Similarity]
    end

    subgraph "Storage"
        D1[SQLCipher]
        D2[AES-256 Encryption]
        D3[Attendance + Embeddings]
    end

    A1 --> B1
    B1 --> B2
    B2 --> C1
    C1 --> D1
```

## Technology Stack Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        F1[React 18]
        F2[React Router v6]
        F3[Lucide Icons]
        F4[CSS3 Design System]
    end

    subgraph "AI Layer"
        AI1[TensorFlow Lite Runtime]
        AI2[MediaPipe Face Mesh]
        AI3[MiniFASNet v2]
        AI4[MobileFaceNet]
    end

    subgraph "Data Layer"
        D1[SQLite / SQLCipher]
        D2[AES-256 Encryption]
        D3[Local File System]
    end

    subgraph "Cloud Layer"
        C1[AWS S3]
        C2[AWS Lambda]
        C3[CloudWatch Monitoring]
    end

    F1 --> AI1
    AI1 --> D1
    D1 --> C1
```

## Security Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Storage Encryption | SQLCipher + AES-256 | Encrypt database at rest |
| Data Isolation | Device Binding | Lock data to specific device |
| Tamper Detection | Hash Chain | Detect attendance record modifications |
| Anti-Spoofing | MiniFASNet + Active Challenges | Prevent photo/video/mask attacks |
| Transfer Security | TLS 1.3 | Encrypt data in transit to cloud |
| Access Control | Face + Liveness | Multi-factor biometric authentication |

## Deployment Architecture

```
Production Deployment:

┌────────────────────┐     ┌────────────────────┐
│   Field Device 1   │     │   Field Device N   │
│  (Android/iOS)     │     │  (Android/iOS)     │
│  - TFLite Models   │     │  - TFLite Models   │
│  - SQLCipher DB    │ ... │  - SQLCipher DB    │
│  - Offline First   │     │  - Offline First   │
└────────┬───────────┘     └────────┬───────────┘
         │                          │
         │    When Online           │
         ▼                          ▼
┌──────────────────────────────────────────────┐
│              AWS Cloud Backend               │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  S3      │  │  Lambda  │  │  Admin    │  │
│  │  Bucket  │──│  Process │──│  Dashboard│  │
│  └──────────┘  └──────────┘  └───────────┘  │
└──────────────────────────────────────────────┘
```
