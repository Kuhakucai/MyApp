import cv2
import numpy as np
import collections

# --- 配置区域 ---
VIDEO_PATH = 'E:\\软件工具\\App\\AI\\Corgi_Butt_Scorer\\assets\\input_videos\\demo_corgi.mp4'  # 替换为你的视频路径
OUTPUT_PATH = 'E:\\软件工具\\App\\AI\\Corgi_Butt_Scorer\\assets\\output_videos\\scored_corgi.mp4'

def get_color_by_score(score):
    """根据分数返回颜色 (BGR格式)"""
    if score < 30:
        return (255, 255, 0)   # 青色 (冷静)
    elif score < 70:
        return (0, 215, 255)   # 金色 (活跃)
    else:
        return (0, 0, 255)     # 红色 (爆表)

def draw_cool_ui(frame, score, bbox, avg_score=0):
    """
    绘制高科技感的 HUD 界面
    原理：创建一个覆盖层(Overlay) -> 画图 -> 与原图混合实现半透明
    """
    # 1. 创建一个和原图一样大的透明覆盖层
    overlay = frame.copy()
    h, w, c = frame.shape
    
    # --- A. 绘制半透明背景板 (左上角) ---
    # 位置：(x1, y1) 到 (x2, y2)
    panel_x, panel_y = 30, 30
    panel_w, panel_h = 320, 160
    
    # 在 Overlay 上画黑色矩形
    cv2.rectangle(overlay, (panel_x, panel_y), (panel_x + panel_w, panel_y + panel_h), (20, 20, 20), -1)
    
    # --- B. 绘制目标锁定框 (在柯基屁股上) ---
    if bbox:
        bx, by, bw, bh = [int(v) for v in bbox]
        color = get_color_by_score(score)
        
        # 1. 画完整矩形边框（半透明，作为底层）
        cv2.rectangle(overlay, (bx, by), (bx + bw, by + bh), color, 2)
        
        # 2. 画外发光效果（更粗的半透明边框）
        glow_color = tuple(int(c * 0.5) for c in color)  # 颜色减半增加透明感
        cv2.rectangle(overlay, (bx-3, by-3), (bx + bw + 3, by + bh + 3), glow_color, 5)
        
        # 3. 画四角装饰线（加粗加长，直接画在frame上保持实线效果）
        line_len = int(min(bw, bh) * 0.35)  # 从0.2增加到0.35
        thickness = 4  # 从2增加到4
        # 左上
        cv2.line(frame, (bx, by), (bx + line_len, by), color, thickness)
        cv2.line(frame, (bx, by), (bx, by + line_len), color, thickness)
        # 右上
        cv2.line(frame, (bx + bw, by), (bx + bw - line_len, by), color, thickness)
        cv2.line(frame, (bx + bw, by), (bx + bw, by + line_len), color, thickness)
        # 左下
        cv2.line(frame, (bx, by + bh), (bx + line_len, by + bh), color, thickness)
        cv2.line(frame, (bx, by + bh), (bx, by + bh - line_len), color, thickness)
        # 右下
        cv2.line(frame, (bx + bw, by + bh), (bx + bw - line_len, by + bh), color, thickness)
        cv2.line(frame, (bx + bw, by + bh), (bx + bw, by + bh - line_len), color, thickness)

        # 4. 中心点（更大，带外圈）
        center_x, center_y = bx + bw // 2, by + bh // 2
        cv2.circle(frame, (center_x, center_y), 8, color, 2)  # 外圈
        cv2.circle(frame, (center_x, center_y), 3, color, -1) # 实心中心

    # --- C. 应用透明度 (混合 Overlay 和 Frame) ---
    alpha = 0.6 # 透明度：0.6 表示背景板有 60% 的不透明度
    cv2.addWeighted(overlay, alpha, frame, 1 - alpha, 0, frame)

    # --- D. 在混合后的图上绘制实心文字 (不透明) ---
    # 1. 标题
    cv2.putText(frame, "BUTT ENGINE STATUS", (panel_x + 20, panel_y + 35), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 200, 200), 1, cv2.LINE_AA)
    
    # 2. 巨大的分数
    color = get_color_by_score(score)
    cv2.putText(frame, f"{int(score)}", (panel_x + 20, panel_y + 100), 
                cv2.FONT_HERSHEY_SIMPLEX, 2.2, color, 4, cv2.LINE_AA)
    
    # 3. 单位/后缀
    cv2.putText(frame, "RPM", (panel_x + 160, panel_y + 100), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2, cv2.LINE_AA)

    # 4. 能量条 (Progress Bar)
    bar_x = panel_x + 20
    bar_y = panel_y + 125
    bar_w = 280
    bar_h = 15
    
    # 进度条底槽 (灰色)
    cv2.rectangle(frame, (bar_x, bar_y), (bar_x + bar_w, bar_y + bar_h), (60, 60, 60), -1)
    
    # 进度条填充 (动态长度 + 动态颜色)
    fill_w = int(bar_w * (min(score, 100) / 100))
    cv2.rectangle(frame, (bar_x, bar_y), (bar_x + fill_w, bar_y + bar_h), color, -1)

    # 5. 平均分显示
    if avg_score > 0:
        avg_color = get_color_by_score(avg_score)
        cv2.putText(frame, f"AVG: {int(avg_score)}", (panel_x + 220, panel_y + 35), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, avg_color, 2, cv2.LINE_AA)

def main():
    cap = cv2.VideoCapture(VIDEO_PATH)
    
    if not cap.isOpened():
        print("❌ 无法打开视频")
        return

    # 1. 框选
    ret, frame = cap.read()
    if not ret: return
    
    cv2.namedWindow('Select Butt', cv2.WINDOW_NORMAL)
    cv2.resizeWindow('Select Butt', 960, 540)
    print("👉 框选柯基屁股，按空格键开始...")
    bbox = cv2.selectROI('Select Butt', frame, fromCenter=False, showCrosshair=True)
    cv2.destroyWindow('Select Butt')

    # 2. 初始化追踪
    tracker = cv2.TrackerCSRT_create()
    tracker.init(frame, bbox)

    # 数据容器
    x_history = collections.deque(maxlen=20) # 缩短一点队列，灵敏度更高
    current_display_score = 0 # 用于平滑显示数值
    all_scores = [] # 存储所有帧的分数用于计算平均值

    # 视频写入
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(OUTPUT_PATH, fourcc, fps, (width, height))

    WINDOW_NAME = 'Corgi Cyber HUD'
    cv2.namedWindow(WINDOW_NAME, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(WINDOW_NAME, 960, 540)

    while True:
        ret, frame = cap.read()
        if not ret: break

        success, bbox = tracker.update(frame)

        target_score = 0
        if success:
            x, y, w, h = [int(v) for v in bbox]
            center_x = x + w // 2
            x_history.append(center_x)
            
            # 简易算法：计算标准差 -> 分数
            if len(x_history) > 2:
                std_dev = np.std(x_history)
                # 目标分数 = 标准差 * K (将15改为10或8进行测试)
                target_score = min(std_dev * 2, 100) # <<<--- 重点修改这里！

        # 数值平滑处理 (让数字跳动不那么生硬)
        current_display_score = current_display_score * 0.95 + target_score * 0.05
        
        # 记录分数用于计算平均值
        all_scores.append(current_display_score)
        
        # 计算当前平均分
        avg_score = np.mean(all_scores) if all_scores else 0

        # --- 绘制 UI ---
        # 这里我们把 bbox 传进去，让 UI 函数处理所有绘制
        draw_cool_ui(frame, current_display_score, bbox if success else None, avg_score)

        cv2.imshow(WINDOW_NAME, frame)
        out.write(frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()
    
    # 计算并显示最终平均分
    final_avg = np.mean(all_scores) if all_scores else 0
    print("✅ 视频生成完毕！")
    print(f"📊 全时段平均分: {final_avg:.2f} RPM")
    print(f"📈 最高分: {max(all_scores):.2f} RPM" if all_scores else "")
    print(f"📉 最低分: {min(all_scores):.2f} RPM" if all_scores else "")

if __name__ == "__main__":
    main()