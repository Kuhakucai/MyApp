import os

def create_file(path, content=""):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ 文件已创建: {path}")

def create_project_structure():
    base_dir = "Corgi_Butt_Scorer"
    
    # 1. 定义目录结构
    dirs = [
        base_dir,
        os.path.join(base_dir, "assets", "input_videos"), # 存放原始柯基视频
        os.path.join(base_dir, "assets", "output_videos"), # 存放AI处理后的视频
        os.path.join(base_dir, "src"), # 源代码
        os.path.join(base_dir, "docs"), # 文案和脚本记录
    ]

    # 2. 创建目录
    for d in dirs:
        if not os.path.exists(d):
            os.makedirs(d)
            print(f"📂 目录已创建: {d}")
        else:
            print(f"📂 目录已存在: {d}")

    # 3. 生成 requirements.txt
    req_content = """opencv-python
mediapipe
numpy
matplotlib
"""
    create_file(os.path.join(base_dir, "requirements.txt"), req_content)

    # 4. 生成主程序 main.py (包含基础 MediaPipe 框架)
    main_code = """import cv2
import mediapipe as mp
import numpy as np
import time

# --- 配置区域 ---
VIDEO_PATH = '../assets/input_videos/demo_corgi.mp4'  # 替换为你的视频路径
OUTPUT_PATH = '../assets/output_videos/scored_corgi.mp4'

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
            # 绘制骨骼关键点
            mp_drawing.draw_landmarks(
                image, 
                results.pose_landmarks, 
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
            )
            
            # --- 核心逻辑开发区 ---
            # 这里我们将提取关键点并计算柯基的扭臀分数
            landmarks = results.pose_landmarks.landmark
            
            # 示例：获取左髋关节 (Left Hip - Index 23)
            # hip_l = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, 
            #          landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
            
            # 你的算法将写在这里...
            
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
"""
    create_file(os.path.join(base_dir, "src", "main.py"), main_code)

    # 5. 生成 README.md
    readme_content = """# 🐶 Corgi Butt Scorer (柯基扭臀评分系统)

## 项目简介
这是一个基于计算机视觉 (OpenCV + MediaPipe) 的趣味项目，用于量化分析柯基犬的“电动马达臀”。

## 快速开始
1. 安装依赖: `pip install -r requirements.txt`
2. 放入视频: 将你的柯基视频重命名为 `demo_corgi.mp4` 并放入 `assets/input_videos/`
3. 运行程序: `cd src` 然后运行 `python main.py`
"""
    create_file(os.path.join(base_dir, "README.md"), readme_content)

    print("\n🎉 项目结构生成完毕！")
    print(f"👉 请进入目录: {base_dir}")
    print("👉 第一步: pip install -r requirements.txt")

if __name__ == "__main__":
    create_project_structure()