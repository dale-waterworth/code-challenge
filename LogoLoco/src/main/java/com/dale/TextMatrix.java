package com.dale;

import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.stream.Collectors;

public class TextMatrix {
    private final String[][] textMatrix;
    private IntSummaryStatistics stats;

    public TextMatrix(List<String> lines) {
        textMatrix = lines
                .stream().map(c -> c.split(""))
                .toArray(String[][]::new);

        stats = Arrays.stream(textMatrix)
                .map(g -> g.length)
                .collect(Collectors.summarizingInt(Integer::intValue));
    }

    public String[][] getTextMatrix() {
        return textMatrix;
    }
    
    public int getX(){
        return stats.getMax() -1;
    }
    
    public int getY(){
        return (int) stats.getCount() -1;
    }

    public String getChar(int i, int j) {
        String value;
        try {
            value = textMatrix[i][j];
        } catch (Exception e) {
            value = " ";
        }
        return value;
    }
}
