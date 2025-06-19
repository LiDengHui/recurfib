import json
import matplotlib.pyplot as plt

# 1. 从JSON文件读取数据
def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

# 2. 绘制多折线图
def plot_fibonacci_performance(data):
    # 创建图形和坐标轴
    plt.figure(figsize=(12, 7))
    ax = plt.gca()

    # 颜色和标记样式
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c']  # 蓝色, 橙色, 绿色
    markers = ['o', 's', '^']  # 圆形, 方形, 三角形

    # 为每种算法绘制折线
    for i, (algo, values) in enumerate(data.items()):
        # 提取坐标数据
        x = [v['index'] for v in values]
        y = [float(v['hz']) for v in values]

        # 绘制折线
        ax.plot(x, y,
                label=algo,
                color=colors[i],
                marker=markers[i],
                markersize=7,
                linewidth=2.5,
                alpha=0.9)

        # 添加数据点标签（每隔3个点显示）
        for j, (xi, yi) in enumerate(zip(x, y)):
            if j % 3 == 0:  # 选择性标注避免重叠
                ax.annotate(f'{yi/1e6:.1f}M' if yi > 1e6 else f'{yi/1e3:.0f}K',
                            (xi, yi),
                            textcoords="offset points",
                            xytext=(0, 10),
                            ha='center',
                            fontsize=9)

    # 设置图形属性
    plt.title('Fibonacci Algorithm Performance Comparison', fontsize=16, pad=20)
    plt.xlabel('Fibonacci Index (n)', fontsize=12)
    plt.ylabel('Operations per Second (Hz)', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.legend(title='Algorithm', fontsize=11, title_fontsize=12)

    # 使用对数刻度
    plt.yscale('log')
    ax.yaxis.set_major_formatter(plt.FuncFormatter(
        lambda y, _: f'{y/1e6:.0f}M' if y >= 1e6 else f'{y/1e3:.0f}K'))

    # 设置坐标轴范围
    plt.xlim(1.8, 30.2)
    plt.ylim(1e2, 1e8)

    # 优化布局并显示
    plt.tight_layout()
    plt.show()

# 3. 主程序
if __name__ == "__main__":
    # 指定JSON文件路径
    json_file_path = "fibonacci_data.json"  # 替换为你的实际文件路径

    try:
        # 读取JSON数据
        fib_data = read_json_file(json_file_path)

        # 绘制图表
        plot_fibonacci_performance(fib_data)

    except FileNotFoundError:
        print(f"错误：文件 '{json_file_path}' 未找到")
    except json.JSONDecodeError:
        print(f"错误：文件 '{json_file_path}' 不是有效的JSON格式")
    except Exception as e:
        print(f"发生错误: {str(e)}")
