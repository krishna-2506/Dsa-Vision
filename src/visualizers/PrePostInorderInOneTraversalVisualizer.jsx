import React from 'react';
import PreorderInorderAndPostorderTraversalInOneTraversalVisualizer, {
  meta as baseMeta,
  solutions as baseSolutions,
  steps as baseSteps
} from './PreorderInorderAndPostorderTraversalInOneTraversalVisualizer';

export const meta = {
  ...baseMeta,
  title: 'Pre, Post, Inorder in One Traversal'
};

export const solutions = baseSolutions;
export const steps = baseSteps;

export default function PrePostInorderInOneTraversalVisualizer(props) {
  return <PreorderInorderAndPostorderTraversalInOneTraversalVisualizer {...props} />;
}
