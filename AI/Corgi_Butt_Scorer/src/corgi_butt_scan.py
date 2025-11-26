import cv2
import numpy as np
from collections import deque

# ================= 配置区域 =================
VIDEO_PATH = 'E:\\软件工具\\App\\AI\\Corgi_Butt_Scorer\\assets\\input_videos\\demo_corgi2.mp4'   # 替换你的视频路径
OUTPUT_PATH = 'E:\\软件工具\\App\\AI\\Corgi_Butt_Scorer\\assets\\output_videos\\scored_corgi.mp4'
RESIZE_HEIGHT = 800        # 视频高度

# --- 赛博配色 (BGR) ---
COLOR_CYBER_YELLOW = (0, 255, 255)  # 黄色 (高亮)
COLOR_NEON_BLUE    = (255, 200, 0)  # 蓝色 (主色调)
COLOR_VIVID_PINK   = (203, 108, 230)# 粉色 (核心重点)
COLOR_WARN_RED     = (50, 50, 255)  # 红色 (警报)
COLOR_WHITE        = (240, 240, 240)
COLOR_PANEL_BG     = (15, 15, 15)   # 深色背景

# ===========================================

def add_transparent_overlay(img, x, y, w, h, alpha=0.6):
    """绘制半透明背景板"""
    rows, cols, _ = img.shape
    # 边界保护
    if x < 0: x = 0
    if y < 0: y = 0
    if x+w > cols: w = cols-x
    if y+h > rows: h = rows-y
    
    sub_img = img[y:y+h, x:x+w]
    rect = np.full(sub_img.shape, COLOR_PANEL_BG, dtype=np.uint8)
    res = cv2.addWeighted(sub_img, 1-alpha, rect, alpha, 0)
    img[y:y+h, x:x+w] = res

def draw_bracket(img, x, y, w, h, color, thickness=2, length=20):
    """绘制四角瞄准框"""
    # 左上
    cv2.line(img, (x, y), (x + length, y), color, thickness)
    cv2.line(img, (x, y), (x, y + length), color, thickness)
    # 右上
    cv2.line(img, (x + w, y), (x + w - length, y), color, thickness)
    cv2.line(img, (x + w, y), (x + w, y + length), color, thickness)
    # 左下
    cv2.line(img, (x, y + h), (x + length, y + h), color, thickness)
    cv2.line(img, (x, y + h), (x, y + h - length), color, thickness)
    # 右下
    cv2.line(img, (x + w, y + h), (x + w - length, y + h), color, thickness)
    cv2.line(img, (x + w, y + h), (x + w, y + h - length), color, thickness)

def draw_trajectory(frame, center_history):
    """绘制屁股后面的拖尾轨迹"""
    if len(center_history) < 2: return
    for i in range(1, len(center_history)):
        thickness = int(np.sqrt(i) * 0.8) + 1
        pt1 = center_history[i-1]
        pt2 = center_history[i]
        cv2.line(frame, pt1, pt2, COLOR_VIVID_PINK, thickness, cv2.LINE_AA)

def draw_unified_panel(frame, sway_val, avg_score, sway_history, fps):
    """
    【核心修改】所有数据整合在左上角面板
    包含：系统头 / 大分数 / 瞬时条 / 波动图
    """
    # 面板位置和大小
    x, y = 25, 25
    w, h = 280, 360 
    
    # 1. 绘制背景
    add_transparent_overlay(frame, x, y, w, h, alpha=0.6)
    
    # --- A. Header Section (系统头) ---
    cv2.putText(frame, "SYSTEM: CORGI-SCAN", (x+15, y+30), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLOR_CYBER_YELLOW, 1, cv2.LINE_AA)
    cv2.putText(frame, f"FPS: {int(fps)}", (x+200, y+30), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, (150,150,150), 1, cv2.LINE_AA)
    
    # --- B. Score Section (大比分) ---
    # 逻辑：分数和评级并排显示
    score_color = COLOR_NEON_BLUE
    rank = "C"
    if avg_score > 60: rank = "B"
    if avg_score > 80: 
        score_color = COLOR_VIVID_PINK
        rank = "A"
    if avg_score > 92: rank = "S"
    
    # 标签
    cv2.putText(frame, "REALTIME SCORE", (x+15, y+60), cv2.FONT_HERSHEY_SIMPLEX, 0.45, COLOR_WHITE, 1, cv2.LINE_AA)
    # 大数字
    cv2.putText(frame, f"{int(avg_score)}", (x+15, y+115), cv2.FONT_HERSHEY_SIMPLEX, 2.2, score_color, 3, cv2.LINE_AA)
    # Rank 印章
    cv2.putText(frame, f"RANK {rank}", (x+140, y+110), cv2.FONT_HERSHEY_SIMPLEX, 1.0, COLOR_WHITE, 2, cv2.LINE_AA)
    
    # --- C. Instant Energy Section (瞬时条) ---
    cv2.putText(frame, "INSTANT TORQUE", (x+15, y+150), cv2.FONT_HERSHEY_SIMPLEX, 0.45, COLOR_WHITE, 1, cv2.LINE_AA)
    
    bar_x = x + 15
    bar_y = y + 165
    bar_w_total = 250
    bar_h_rect = 10
    
    # 能量比率
    energy_ratio = min(abs(sway_val) / 35.0, 1.0)
    fill_w = int(bar_w_total * energy_ratio)
    
    # 底槽
    cv2.rectangle(frame, (bar_x, bar_y), (bar_x + bar_w_total, bar_y + bar_h_rect), (50,50,50), -1)
    
    # 填充色 (渐变逻辑)
    bar_color = COLOR_CYBER_YELLOW
    if energy_ratio > 0.5: bar_color = COLOR_NEON_BLUE
    if energy_ratio > 0.8: bar_color = COLOR_WARN_RED
    
    cv2.rectangle(frame, (bar_x, bar_y), (bar_x + fill_w, bar_y + bar_h_rect), bar_color, -1)

    # --- D. Waveform Graph (波动图) ---
    cv2.putText(frame, "WIGGLE ANALYZER", (x+15, y+210), cv2.FONT_HERSHEY_SIMPLEX, 0.45, COLOR_WHITE, 1, cv2.LINE_AA)
    
    graph_x = x + 15
    graph_y = y + 280
    graph_w_rect = 250
    graph_h_rect = 100
    
    # 中线
    cv2.line(frame, (graph_x, graph_y), (graph_x + graph_w_rect, graph_y), (80,80,80), 1)
    
    # 绘制折线
    if len(sway_history) > 1:
        points = []
        for i, val in enumerate(sway_history):
            pt_x = graph_x + int(i * (graph_w_rect / len(sway_history)))
            # 缩放幅度
            pt_y = graph_y - int(val * 2.0)
            # 限制不出界
            pt_y = np.clip(pt_y, graph_y - 50, graph_y + 50)
            points.append((pt_x, pt_y))
        
        cv2.polylines(frame, [np.array(points)], False, COLOR_CYBER_YELLOW, 2, cv2.LINE_AA)

def main():
    cap = cv2.VideoCapture(VIDEO_PATH)
    if not cap.isOpened():
        print("无法打开视频")
        return

    tracker = cv2.TrackerCSRT_create()
    ret, frame = cap.read()
    if not ret: return
    
    # 尺寸预处理
    h, w = frame.shape[:2]
    scale = RESIZE_HEIGHT / h
    frame_resized = cv2.resize(frame, (int(w*scale), RESIZE_HEIGHT))
    
    print("请框选柯基屁股，然后按空格！")
    bbox = cv2.selectROI("SETUP", frame_resized, fromCenter=False, showCrosshair=True)
    cv2.destroyWindow("SETUP")
    tracker.init(frame_resized, bbox)
    
    # 数据容器
    center_history = deque(maxlen=40)
    sway_history = deque(maxlen=50)
    score_history = deque(maxlen=60)
    prev_x = int(bbox[0] + bbox[2]/2)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(OUTPUT_PATH, fourcc, 30.0, (frame_resized.shape[1], RESIZE_HEIGHT))

    while True:
        timer = cv2.getTickCount()
        ret, frame = cap.read()
        if not ret: break
        
        frame = cv2.resize(frame, (int(w*scale), RESIZE_HEIGHT))
        
        success, box = tracker.update(frame)
        
        current_sway = 0
        avg_score = 0
        
        if success:
            (x, y, w_box, h_box) = [int(v) for v in box]
            center_x = int(x + w_box/2)
            center_y = int(y + h_box/2)
            
            # 1. 轨迹 (底层)
            center_history.append((center_x, center_y))
            draw_trajectory(frame, center_history)
            
            # 2. 瞄准框
            draw_bracket(frame, x, y, w_box, h_box, COLOR_CYBER_YELLOW, thickness=2)
            cv2.circle(frame, (center_x, center_y), 4, COLOR_VIVID_PINK, -1)
            
            # 3. 计算分数
            dx = center_x - prev_x
            current_sway = dx * 5 # 视觉放大
            
            instant_score = abs(dx) * 12
            instant_score = min(instant_score, 100)
            score_history.append(instant_score)
            
            if len(score_history) > 0:
                # 均分计算：基础分60 + 波动分
                avg_score = 60 + (sum(score_history) / len(score_history)) * 0.4
                avg_score = min(avg_score, 99)
            
            sway_history.append(current_sway)
            prev_x = center_x
            
            # 4. 绘制统一的左上角面板
            draw_unified_panel(frame, current_sway, avg_score, sway_history, 0)
            
        else:
            cv2.putText(frame, "TARGET LOST", (frame.shape[1]//2 - 100, frame.shape[0]//2), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, COLOR_WARN_RED, 2)
            center_history.clear()

        # FPS & Update Panel
        fps = cv2.getTickFrequency() / (cv2.getTickCount() - timer)
        # 重新绘制面板以刷新FPS (避免频闪，其实可以合并，但这样逻辑简单)
        draw_unified_panel(frame, current_sway, avg_score, sway_history, fps)

        cv2.imshow("Corgi Analyzer v4.0", frame)
        out.write(frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()