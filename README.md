# Slidev Addon TikZJax

> [!WARNING]
> 
> It is unstable for this approach to handle modules like `circuitikz`, `pgfplot`, etc.
> It may crash some time, since the `.sty` file may not find due to instability of `node-tikzjax`.

![example](./assets/example.png)

[Sli.dev](https://sli.dev/) addon $\mathrm{Ti}k\mathrm{ZJax}$, which can compile TikZ source to plot for presentations in sli.dev.

This project utilizes [node-tikzjax](https://www.npmjs.com/package/node-tikzjax/v/1.0.0), which can compile TeX to SVG.

Thanks, @kermanx, for providing advice on writing addons!