/*
 * @Author: shanzhilin
 * @Date: 2021-07-05 09:52:42
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-07-15 17:13:55
 */

import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

export default function IndexPage() {
  // 获取canvas对象
  const [canvasCon, setCanvasCon] = useState<any>(null);

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

  // 绘制三角形
  const drawTrl = () => {
    canvasCon.clear();
    const triangle = new fabric.Triangle({
      width: 20,
      height: 30,
      fill: 'blue',
      left: 50,
      top: 50,
    });

    canvasCon.add(triangle);
  };

  // 绘制图像
  const drawImage = () => {
    canvasCon.clear();

    /**
     *   方法一: 通过image元素对象
     * **/

    // const img = new Image();
    // img.src =
    //   'https://cdn1.mihuiai.com/media/images/dcae4f65-969a-4cf7-91a5-abd15846ff74_thumb.png';
    // img.onload = function () {
    //   const iamgeEl = new fabric.Image(img, {
    //     width:100,
    //     height:100,
    //     left: 100,
    //     top: 100,
    //     angle: 0,
    //     opacity: 1,
    //   });
    //   canvasCon.add(iamgeEl);
    // };

    /**
     * 方法二：fromURL的形式
     */
    fabric.Image.fromURL(
      'https://cdn1.mihuiai.com/media/images/dcae4f65-969a-4cf7-91a5-abd15846ff74_thumb.png',
      function (oImg: any) {
        oImg.set({
          left: 100,
          top: 100,
          angle: 0,
          scaleX: 0.3,
          scaleY: 0.3,
        });
        canvasCon.add(oImg);
      },
    );
  };

  // 添加滤镜效果
  const drawFilters = () => {
    canvasCon.clear();
    /**
     * 滤镜类型
     * @param BaseFilter: 基础滤镜
     * @param Blur: 模糊度
     * @param Brightness： 亮度
     * @param ColorMatrix: 色彩矩阵
     * @param contrast: 对比度
     * @param convolute: 旋转
     * @param Gamma：伽马
     * @param Grayscale：灰度
     * @param HueRotation：色阶
     * @param Invert：翻转
     * @param noise
     * @param Pixelate：像素化
     * @param RemoveColor
     * @param Resize：缩放
     * @param Saturation：饱和度
     *
     */
    fabric.Image.fromURL(
      'https://cdn1.mihuiai.com/media/images/dcae4f65-969a-4cf7-91a5-abd15846ff74_thumb.png',
      function (oImg: any) {
        oImg.set({
          scaleX: 0.3,
          scaleY: 0.3,
        });
        canvasCon.add(oImg);

        /**
         * filters是一个数组, 因此可以使用数组的push, pop 等方法
         */
        oImg.filters.push(
          new fabric.Image.filters.Sepia(),
          new fabric.Image.filters.Brightness({ brightness: 1 }),
        );
        // 图片加载完成之后，应用滤镜效果
        oImg.applyFilters();
        // 将处理后的图片添加到canvas画布上
        canvasCon.renderAll();
      },
      { crossOrigin: 'anonymous' },
    );
  };

  // 渐变
  const drawGradient = () => {
    canvasCon.clear();
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
    });

    const gradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: circle.height, y2: 0 },
      colorStops: [
        { offset: 0, color: 'red' },
        { offset: 0.2, color: 'orange' },
        { offset: 0.4, color: 'yellow' },
        { offset: 0.6, color: 'green' },
        { offset: 0.8, color: 'blue' },
        { offset: 1, color: 'purple' },
      ],
    });
    circle.set('fill', gradient);
    circle.on('moving', (options: any) => {
      console.log(options);
    });
    circle.set({
      borderColor: 'red',
      cornerColor: 'green',
      cornerSize: 6,
    });
    canvasCon.on('mouse:down', () => {
      console.log('move:down');
    });
    canvasCon.add(circle);
  };

  // 文字
  const drawText = () => {
    canvasCon.clear();
    const text = new fabric.Text('hello world', {
      left: 100,
      top: 100,
      fontFamily: 'Comic Sans',
      fontSize: 40,
      fontWeight: 'bold',
    });
    const text1 = new fabric.Text('I am normal text', {
      top: 200,
      left: 200,
      linethrough: true,
      stroke: 'red',
    });

    text1.on('selected', () => {
      console.log('selected a rectangle');
    });

    canvasCon.add(text, text1);
  };

  //组合
  const drawGroup = () => {
    canvasCon.clear();
    const circle = new fabric.Circle({
      radius: 100,
      fill: 'red',
      scaleY: 0.5,
      originX: 'center',
      originY: 'center',
    });

    const text = new fabric.Text('hello world', {
      fontSize: 30,
      originX: 'center',
      originY: 'center',
    });

    const group = new fabric.Group([circle, text], {
      left: 150,
      top: 100,
    });

    const circle1 = new fabric.Circle({
      radius: 50,
      fill: 'red',
      left: 0,
    });
    const circle2 = new fabric.Circle({
      radius: 50,
      fill: 'green',
      left: 100,
    });
    const circle3 = new fabric.Circle({
      radius: 50,
      fill: 'blue',
      left: 200,
    });

    const group1 = new fabric.Group([circle1, circle2, circle3], {
      left: 400,
      top: 100,
    });

    canvasCon.add(group, group1);
  };

  // 序列化
  const toObject = () => {
    console.log(canvasCon.toObject());
    console.log(canvasCon.toJSON());
    console.log(canvasCon.toSVG());
  };

  // 反序列化
  const retuenToObject = () => {
    canvasCon.loadFormJSON(`object:[{angle: 0
      backgroundColor: ""
      charSpacing: 0
      fill: "rgb(0,0,0)"
      fillRule: "nonzero"
      flipX: false
      flipY: false
      fontFamily: "Comic Sans"
      fontSize: 40
      fontStyle: "normal"
      fontWeight: "bold"
      globalCompositeOperation: "source-over"
      height: 45.2
      left: 100
      lineHeight: 1.16
      linethrough: false
      opacity: 1
      originX: "left"
      originY: "top"
      overline: false
      paintFirst: "fill"
      path: null
      scaleX: 1
      scaleY: 1
      shadow: null
      skewX: 0
      skewY: 0
      stroke: null
      strokeDashArray: null
      strokeDashOffset: 0
      strokeLineCap: "butt"
      strokeLineJoin: "miter"
      strokeMiterLimit: 4
      strokeUniform: false
      strokeWidth: 1
      styles: {}
      text: "hello world"
      textAlign: "left"
      textBackgroundColor: ""
      top: 100
      type: "text"
      underline: false
      version: "4.4.0"
      visible: true
      width: 226.7}]`);
  };
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      // isDrawingMode: true,
      selectable: false, //设置是否可以选中拖动 fabric提供的
      selection: false,
    });
    canvas.on('mouse:wheel', function (opt: any) {
      console.log(opt);
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    setCanvasCon(canvas);
    return () => {
      setCanvasCon(null);
    };
  }, []);
  return (
    <div className={styles.main_container}>
      <div className={styles.btn_box}>
        <div className={styles.btn_item} onClick={drawRect}>
          矩形
        </div>
        <div className={styles.btn_item} onClick={drawCircle}>
          圆形
        </div>
        <div className={styles.btn_item} onClick={drawTrl}>
          三角形
        </div>
        <div className={styles.btn_item} onClick={drawImage}>
          图像
        </div>
        <div className={styles.btn_item} onClick={drawFilters}>
          滤镜
        </div>
        <div className={styles.btn_item} onClick={drawGradient}>
          渐变
        </div>
        <div className={styles.btn_item} onClick={drawText}>
          文字
        </div>
        <div className={styles.btn_item} onClick={drawGroup}>
          分组
        </div>
        <div className={styles.btn_item} onClick={toObject}>
          序列化
        </div>
        <div className={styles.btn_item} onClick={retuenToObject}>
          反序列化
        </div>
      </div>
      <div className={styles.draw_option_box}>
        <div className={styles.draw_btn_box}></div>
        <canvas id="canvas" width="1200" height="600"></canvas>
      </div>
    </div>
  );
}
