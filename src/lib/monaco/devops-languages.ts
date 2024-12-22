import { languages } from 'monaco-editor';

export function registerDevOpsLanguages(monaco: any) {
  // Terraform language support
  monaco.languages.register({ id: 'terraform' });
  monaco.languages.setMonarchTokensProvider('terraform', {
    keywords: [
      'resource', 'data', 'variable', 'provider', 'output',
      'module', 'locals', 'terraform'
    ],
    operators: [
      '=', '>=', '<=', '!=', '+'
    ],
    // Add more syntax highlighting rules
  });

  // Kubernetes YAML support
  monaco.languages.register({ id: 'kubernetes-yaml' });
  monaco.languages.setMonarchTokensProvider('kubernetes-yaml', {
    keywords: [
      'apiVersion', 'kind', 'metadata', 'spec', 'status',
      'containers', 'volumes', 'env'
    ],
    // Add more syntax highlighting rules
  });
}