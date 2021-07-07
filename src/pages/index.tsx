/*
 * @Author: shanzhilin
 * @Date: 2021-07-05 09:52:42
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-07-07 09:57:33
 */

import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

export default function IndexPage() {
  // 获取canvas对象
  const [canvasCon, setCanvasCon] = useState<any>();

  // 绘制矩形
  const drawRect = () => {
    canvasCon.clear();
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45,
    });

    canvasCon.add(rect);
  };

  // 绘制圆形
  const drawCircle = () => {
    canvasCon.clear();
    const circle = new fabric.Circle({
      radius: 20,
      fill: 'green',
      left: 100,
      top: 100,
    });

    canvasCon.add(circle);
  };

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      // isDrawingMode: true,
      selectable: false, //设置是否可以选中拖动 fabric提供的
      selection: false,
    });

    setCanvasCon(canvas);
  }, []);
  return (
    <div className={styles.main_container}>
      <div className={styles.btn_box}>
        <div className={styles.btn_item} onClick={drawRect}>
          绘制矩形
        </div>
        <div className={styles.btn_item} onClick={drawCircle}>
          绘制圆形
        </div>
      </div>
      <div className={styles.draw_option_box}>
        <div className={styles.draw_btn_box}></div>
        <canvas id="canvas" width="1200" height="600"></canvas>
      </div>
    </div>
  );
}
