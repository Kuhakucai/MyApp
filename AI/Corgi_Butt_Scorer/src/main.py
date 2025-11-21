import cv2
import mediapipe as mp
import numpy as np
import time

# --- 配置区域 ---
VIDEO_PATH = 'E:\\软件工具\\AI\\Corgi_Butt_Scorer\\assets\\input_videos\\demo_corgi.mp4'  # 替换为你的视频路径
OUTPUT_PATH = 'E:\\软件工具\\AI\\Corgi_Butt_Scorer\\assets\\output_videos\\scored_corgi.mp4'

# --- MediaPipe 初始化 ---
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1, # 0=Lite, 1=Full, 2=Heavy
    smooth_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

def calculate_angle(a, b, c):
    '''计算三个点之间的角度'''
    a = np.array(a) # First
    b = np.array(b) # Mid
    c = np.array(c) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle > 180.0:
        angle = 360-angle
        
    return angle

def main():
    cap = cv2.VideoCapture(VIDEO_PATH)
    
    # 检查视频是否打开
    if not cap.isOpened():
        print("❌ 无法打开视频，请检查路径或使用摄像头 (index 0)")
        return

    # 获取视频属性用于保存
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # 初始化视频写入器
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(OUTPUT_PATH, fourcc, fps, (width, height))

    print("🚀 AI 评分系统启动中...")

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # 1. 转换颜色空间 BGR -> RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
      
        # 2. MediaPipe 推理
        results = pose.process(image)
      
        # 3. 转换回 BGR 用于 OpenCV 显示
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        if results.pose_landmarks:
        # 绘制骨骼关键点...
            
            # --- 核心逻辑开发区 ---
            landmarks = results.pose_landmarks.landmark
            
            # 获取图像的宽度和高度，用于将归一化坐标转换为像素坐标
            h, w, c = image.shape
            
            # 提取我们需要的关键点（并转换为像素坐标）
            
            # 左髋关节 (Left Hip - 索引 23)
            try:
                hip_l = [
                    int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * w), 
                    int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h)
                ]
            except:
                hip_l = [0, 0] # 如果识别失败，给个默认值

            # 右髋关节 (Right Hip - 索引 24)
            try:
                hip_r = [
                    int(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x * w), 
                    int(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y * h)
                ]
            except:
                hip_r = [0, 0]
                
            # 我们用左肩和右肩的中点作为“尾根”的近似参考点
            # 左肩 (Left Shoulder - 索引 11)
            shoulder_l = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w, 
                        landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h]
                        
            # 右肩 (Right Shoulder - 索引 12)
            shoulder_r = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w, 
                        landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h]
            
            # 尾根近似点 (T - Tail Root Approximation) - 取两肩的中点
            # (因为柯基体型短，肩部中点比腰部中点更稳定)
            T_approx = [
                int((shoulder_l[0] + shoulder_r[0]) / 2),
                int((shoulder_l[1] + shoulder_r[1]) / 2)
            ]

            # --- 调试：在图像上画出这些关键点并标注 ---
            cv2.circle(image, tuple(hip_l), 5, (0, 0, 255), cv2.FILLED) # 蓝色 - 左髋
            cv2.circle(image, tuple(hip_r), 5, (0, 255, 0), cv2.FILLED) # 绿色 - 右髋
            cv2.circle(image, tuple(T_approx), 5, (255, 0, 0), cv2.FILLED) # 红色 - 尾根近似
            
        # 显示画面
        cv2.imshow('Corgi AI Scorer', image)
        
        # 保存处理后的帧
        out.write(image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()
    print("✅ 处理完成，视频已保存。")

if __name__ == "__main__":
    main()
