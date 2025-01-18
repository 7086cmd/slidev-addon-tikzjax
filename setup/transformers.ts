import type {MarkdownTransformContext} from '@slidev/types'
import {defineTransformersSetup} from '@slidev/types'
import {dvi2svg, load, tex} from 'node-tikzjax'

async function transformAllTikzToSvg(tikz: {
    tex: string
    libraries: string[]
}[]) {
    await load()
    return await Promise.all(tikz.map(async (code) => {
        const texCode = await tex(code.tex, {
            tikzLibraries: code.libraries.join(','),
            showConsole: true
        })
        const b64 = Buffer.from(await dvi2svg(texCode)).toString('base64')
        return `<img src="data:image/svg+xml;base64,${b64}" />`
    }))
}

async function tikzJaxTransformer(ctx: MarkdownTransformContext) {
    const documents: {
        tex: string
        libraries: string[]
    }[] = []
    ctx.s.replace(
        /^```tikzjax *(\{[^\n]*\})?\n([\s\S]+?)\n```/gm,
        (full, libraries: string = '', code: string = '') => {
            documents.push({
                libraries: libraries.slice(1, -1).split(',').map(x => x.trim()),
                tex: code
            })
            return full
        },
    )
    const svgs = await transformAllTikzToSvg(documents)
    let count = 0
    ctx.s.replace(
        /^```tikzjax *(\{[^\n]*\})?\n([\s\S]+?)\n```/gm,
        (_) => {
            return svgs[count++]
        },
    )
}

export default defineTransformersSetup(() => {
    return {
        pre: [],
        preCodeblock: [tikzJaxTransformer],
        postCodeblock: [],
        post: [],
    }
})