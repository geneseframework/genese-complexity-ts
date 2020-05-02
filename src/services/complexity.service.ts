// import * as ts from 'typescript';
// import * as utils from 'tsutils';
//
// /**
//  * Calculates the cognitive complexity of a method
//  * @param method: ts.Node
//  */
// export function getMethodCognitiveComplexity(method: ts.Node): number {
//     let complexity = 0;
//     let depthLevel = 0;
//     ts.forEachChild(method, function cb(node) {
//         if (utils.isFunctionWithBody(node)) {
//             depthLevel ++;
//             complexity += depthLevel;
//             ts.forEachChild(node, cb);
//         } else {
//             if (increasesComplexity(node, 'cognitive')) {
//                 depthLevel ++;
//                 complexity += depthLevel;
//             }
//             ts.forEachChild(node, cb);
//         }
//     });
//     return complexity;
// }
//
//
// //
