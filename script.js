(function () {
  const annotate = RoughNotation.annotate;
  const annotationGroup = RoughNotation.annotationGroup;
  const $ = (t) => document.querySelector(t);

  // export interface RoughAnnotationConfig {
  //   type: RoughAnnotationType;
  //   animate?: boolean; // defaults to true
  //   animationDuration?: number; // defaulst to 1000ms
  //   animationDelay?: number; // default = 0
  //   color?: string; // defaults to currentColor
  //   strokeWidth?: number; // default based on type
  //   padding?: number; // defaults to 5px
  // }

  {
    // top
    const a1 = annotate($('h1'), { type: 'highlight', color: '#FFF176' });
    const a2 = annotate($('header span.abox'), { type: 'box', color: '#F44336', padding: 3 });
    const a3 = annotate($('header a'), { type: 'underline', color: '#2196F3', padding: 3, strokeWidth: 3 });
    const a4 = annotate($('header span.acircle'), { type: 'circle', color: '#F44336', padding: 5 });
    const ag = annotationGroup([a1, a2, a3, a4]);
    ag.show();
  }

  {
    const config = { type: 'underline', strokeWidth: 3, padding: 3, color: '#B71C1C' };
    const a1 = annotate($('#underlineSection h3'), config);
    const a2 = annotate($('#underlineSection span'), config);
    $('#underlineSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const config = { type: 'box', strokeWidth: 2, padding: 4, color: '#4A148C' };
    const a1 = annotate($('#boxSection h3'), config);
    const a2 = annotate($('#boxSection span'), config);
    $('#boxSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const config = { type: 'circle', padding: 6, color: '#0D47A1' };
    const a1 = annotate($('#circleSection h3'), config);
    const a2 = annotate($('#circleSection span'), config);
    $('#circleSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const config = { type: 'highlight', color: '#FFD54F' };
    const a1 = annotate($('#highlightSection h3'), config);
    const a2 = annotate($('#highlightSection span'), config);
    $('#highlightSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const config = { type: 'strike-through', color: '#1B5E20', strokeWidth: 2 };
    const a1 = annotate($('#strikeSection h3'), config);
    const a2 = annotate($('#strikeSection span'), config);
    $('#strikeSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const config = { type: 'crossed-off', color: '#F57F17', strokeWidth: 2 };
    const a1 = annotate($('#crossSection h3'), config);
    const a2 = annotate($('#crossSection span'), config);
    $('#crossSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const a1 = annotate($('#bracketSection h3'), { type: 'bracket', color: 'red', strokeWidth: 2, brackets: 'top' });
    const a2 = annotate($('#bracketSection .blockp'), { type: 'bracket', color: 'red', strokeWidth: 2, padding: [2, 10], brackets: ['left', 'right'] });
    const ag = annotationGroup([a2, a1]);
    $('#bracketSection button').addEventListener('click', () => {
      ag.hide();
      ag.show();
    });
  }

  {
    const config = { type: 'highlight', color: '#FFD54F', animationDuration: 1500, multiline: true, iterations: 1 };
    const a1 = annotate($('#multilineSection #mlspan'), config);
    $('#multilineSection button').addEventListener('click', () => {
      a1.hide();
      a1.show();
    });
  }

  {
    const a1 = annotate($('#noanimSection h3'), { type: 'box', color: '#263238', animate: false });
    const a2 = annotate($('#noanimSection i'), { type: 'underline', color: '#263238', strokeWidth: 4, animate: false });
    $('#noanimSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const a1 = annotate($('#configSection h3'), { type: 'box', color: '#D50000', strokeWidth: 10 });
    const a2 = annotate($('#configSection span'), { type: 'box', color: '#33691E', animationDuration: 3000 });
    $('#configSection button').addEventListener('click', () => {
      a1.hide();
      a2.hide();
      a1.show();
      a2.show();
    });
  }

  {
    const a1 = annotate($('#groupSection h3'), { type: 'box', color: '#BF360C' });
    const a2 = annotate($('#groupSection span'), { type: 'highlight', color: '#FFFF00' });
    const a3 = annotate($('#groupSection i'), { type: 'underline', color: '#BF360C', animationDuration: 300 });
    const ag = annotationGroup([a2, a3, a1]);
    $('#groupSection button').addEventListener('click', () => {
      ag.hide();
      ag.show();
    });
  }




})();