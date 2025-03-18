export const colors = [
  '#0A1128',
  '#1282A2',
  '#CA96A6',
  '#C9CA96',
  '#96A5CA',
  '#D6BBFB',
  '#DBE7FB',
  '#95CDE7',
  '#7B66AD',
  '#96CAB8',
  '#4D80C6',
];

// https://tailwindcss.com/docs/colors
export const strokes = [
  'oklch(0.879 0.169 91.605)', //amber
  'oklch(0.871 0.15 154.449)', //green
  'oklch(0.808 0.114 19.571)', //red
  'oklch(0.827 0.119 306.383)', //purple
  'oklch(0.865 0.127 207.078)', //cyan
  'oklch(0.833 0.145 321.434)', // fuchsia
  'oklch(0.81 0.117 11.638)', //rose
  'oklch(0.869 0.022 252.894)', //slate
  'oklch(0.855 0.138 181.071)', //teal
  'oklch(0.897 0.196 126.665)', //lime
  'oklch(0.828 0.111 230.318)', //sky
];

/**
 * @param  {} variant='default' | 'hex'
 *  @return {colors array}

 */
function useColors(variant = 'default') {
  if (variant == 'hex') {
    return colors;
  }

  return [
    'oklch(0.973 0.071 103.193)',
    'oklch(0.962 0.044 156.743)',
    'oklch(0.936 0.032 17.717)',
    'oklch(0.946 0.033 307.174)',
    'oklch(0.956 0.045 203.388)',
    'oklch(0.903 0.076 319.62)',
    'oklch(0.941 0.03 12.58)',
    'oklch(0.984 0.003 247.858)',
    'oklch(0.953 0.051 180.801)',
    'oklch(0.967 0.067 122.328)',
    'oklch(0.977 0.013 236.62)',
  ];
}

export { useColors };
