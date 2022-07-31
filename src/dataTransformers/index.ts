import * as pkg from '../../package.json';
const {version} = pkg;
const transformerPath = `./v${version}/dataTransformers`

export async function runDataVersionTransfroms(data:any) {
    const {sectionTransformer, taskTransformer} = await import(transformerPath);
    const sectionTransformedData = sectionTransformer(data);
    const taskTransformedData = taskTransformer(sectionTransformedData);

    return taskTransformedData;
}