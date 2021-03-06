import bn from 'easy-bem-naming';

export default class ClassNameBuilder {

    constructor(options) {
        this.b = bn(options);
    }

    stringify(block, elem, mods, mixes, cls) {
        return this.b(block).e(elem).m(mods).mix(cls).mix(this.uniqueMixes(block, mixes)).toString();
    }

    uniqueMixes(block, mixes) {
        if(!mixes) return;

        const key = (b, e) => `${b}$${e}`,
            uniq = {};

        [].concat(...mixes).forEach(mix => {
            if(!mix) return;

            const k = key(mix.block, mix.elem);

            if(uniq[k]) uniq[k].mods = Object.assign({}, uniq[k].mods, mix.mods);
            else uniq[k] = mix;
        });

        return Object.keys(uniq).map(k =>
            this.b(uniq[k].block || block).e(uniq[k].elem).m(uniq[k].mods));
    }

}
